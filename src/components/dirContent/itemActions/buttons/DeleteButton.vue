<script>
import ConfirmModal from "@/components/modals/ConfirmModal.vue";
import {useSettingsStore} from "@/stores/settingsStore.js";
import {useCheckedItemsStore} from "@/stores/checkedItemsStore.js";
import {useDirItemsStore} from "@/stores/dirItemsStore.js";

export default {
  name: "DeleteButton",
  components: {ConfirmModal},
  props: {
    items: {
      type: Array
    }
  },
  data() {
    return {
      showConfirmModal: false,
      settingsStore: useSettingsStore(),
      checkedItemsStore: useCheckedItemsStore(),
      dirItemsStore: useDirItemsStore()
    }
  },
  methods: {
    confirmDelete() {
      this.showConfirmModal = true;
    },
    hideConfirmModal() {
      this.showConfirmModal = false;
      this.$emitter.emit("uncheckInput");
      this.checkedItemsStore.items = [];
    },
    deleteItems() {
      this.showConfirmModal = false;
      const itemsToDelete = this.getFromData();

      const deleteRequest = (items, type) => {
        if (items.length) {
          const options = {
            body: JSON.stringify({ items })
          };
          this.$http.delete(this.getUrl(type), options).then((data) => {
            this.showErrors(data);
            if (data.result) {
              const status = data.result.status;
              window.showAlert(status, data.result.message);
              this.removeItemFromDirStore(status, items);

              this.$emitter.emit("uncheckInput");
              this.checkedItemsStore.items = [];
            }
          });
        }
      };

      deleteRequest(itemsToDelete.files, "file");
      deleteRequest(itemsToDelete.dirs, "dir");
    },
    getUrl(type) {
      const diskName = this.items[0].diskName;
      if (type === "file") {
        return this.settingsStore.baseUrl
            + "disks/" + diskName
            + "/items/delete"
      }
      else if (type === "dir") {
        return this.settingsStore.baseUrl
            + "disks/" + diskName
            + "/dirs/delete"
      }
    },
    getFromData() {
      let files = [];
      let dirs = [];

      this.items.forEach(item => {
        const itemToDelete = {
          name: item.name,
          path: item.path
        };
        if (item.type === 'file') {
          files.push(itemToDelete);
        } else if (item.type === 'dir') {
          dirs.push(itemToDelete);
        }
      });

      return { files, dirs };
    },
    removeItemFromDirStore(status, itemsToDelete) {
      if (status === "success") {
        this.dirItemsStore.$patch((state) => {
          const targetDirItems = state.data.find((dirItems) => {
            return dirItems.diskName === this.items[0].diskName && dirItems.dirName === this.items[0].dirName;
          });

          const itemsToDeleteNames = itemsToDelete.map(item => item.name);
          if (targetDirItems) {
            targetDirItems.dirItems = targetDirItems.dirItems.filter((item) => {
              return !itemsToDeleteNames.includes(item.name)
            });
          }
        });
      }
    },
    showErrors(data) {
      if (data.errors) {
        this.$emitter.emit(
            "showErrorModal",
            {
              headline: "Delete item error",
              errors: data.errors,
              showErrorKey: false
            }
        );
      }
    }
  }
}
</script>

<template>
  <button type="button" class="action-btn" @click="confirmDelete">
    <img src="@assets/trash3.svg" alt="" class="svg-img">
    <span class="action-btn__text item-action-btn__text">Delete</span>
  </button>

  <ConfirmModal v-if="showConfirmModal"
                :confirm-method-on-yes="deleteItems"
                :confirm-method-on-no="hideConfirmModal">

    <template v-slot:confirmQuestion>
      You are about to delete "{{items.length}}" items<br>
      Do you want to delete it?
    </template>
  </ConfirmModal>
</template>