<script>
import ConfirmModal from "@/components/modals/ConfirmModal.vue";
import storesMixin from "@/mixins/storesMixin.js";

export default {
  name: "DeleteButton",
  components: {ConfirmModal},
  mixins: [storesMixin],
  props: {
    items: Array
  },
  data() {
    return {
      showConfirmModal: false,
      diskName: null,
      dirName: null
    }
  },
  created() {
    this.diskName = this.settingsStore.defaultFileExplorerViewData.selectedDisk;
    this.dirName = this.settingsStore.defaultFileExplorerViewData.selectedDir;
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
        if (items.length > 0) {
          const options = {
            body: JSON.stringify({ items })
          };
          this.$http.delete(this.getUrl(type), options).then((data) => {
            this.$emitter.emit("uncheckInput");
            this.checkedItemsStore.items = [];
            if (data.result) {
              const status = data.result.status;
              window.showAlert(status, data.result.message);
              this.removeItemFromDirStore(status, items);
            }
          });
        }
      };

      deleteRequest(itemsToDelete.files, "file");
      deleteRequest(itemsToDelete.dirs, "dir");
    },
    getUrl(type) {
      if (type === "file") {
        return this.settingsStore.baseUrl
            + "disks/" + this.diskName
            + "/files/delete"
      }
      else if (type === "dir") {
        return this.settingsStore.baseUrl
            + "disks/" + this.diskName
            + "/dirs/delete"
      }
    },
    getFromData() {
      let itemsToDelete = [];

      this.items.forEach(item => {
        itemsToDelete.push({
          name: item.name,
          path: item.path,
          type: item.type
        })
      });

      return itemsToDelete.reduce((acc, item) => {
        if (item.type === 'file') {
          acc.files.push(item);
        } else if (item.type === 'dir') {
          acc.dirs.push(item);
        }
        return acc;
      }, {files: [], dirs: []});
    },
    removeItemFromDirStore(status, filesToDelete) {
      if (status === "success") {
        this.dirItemsStore.$patch((state) => {
          filesToDelete.forEach(itemToDelete => {
            const targetDirItems = state.data.find(dirItems => dirItems.diskName === this.diskName && dirItems.dirName === this.dirName);

            if (targetDirItems) {
              targetDirItems.dirItems = targetDirItems.dirItems.filter(item => item.name !== itemToDelete.name);
            }
          });
        });
      }
    },
  }
}
</script>

<template>
  <button type="button" class="action-btn" @click="confirmDelete">
    <img src="../../../../assets/img/trash3.svg" alt="" class="svg-img">
    <span class="action-btn__text item-action-btn__text">Delete</span>
  </button>

  <ConfirmModal v-if="showConfirmModal"
                :confirm-method-on-yes="deleteItems"
                :confirm-method-on-no="hideConfirmModal">

    <template v-slot:confirmQuestion>
      You are about to delete "{{items.length}}" items<br> Do you want to delete it?
    </template>
  </ConfirmModal>
</template>

<style scoped>

</style>