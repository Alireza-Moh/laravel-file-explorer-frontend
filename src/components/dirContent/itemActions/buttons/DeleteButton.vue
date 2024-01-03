<script>
import ConfirmModal from "@/components/modals/ConfirmModal.vue";
import itemActionMixin from "@/components/dirContent/itemActions/mixins/itemActionMixin.js";
import storesMixin from "@/mixins/storesMixin.js";

export default {
  name: "DeleteButton",
  components: {ConfirmModal},
  mixins: [itemActionMixin, storesMixin],
  props: {
    item: Object
  },
  data() {
    return {
      showConfirmModal: false
    }
  },
  methods: {
    confirmDelete() {
      this.showConfirmModal = true;
    },
    hideConfirmModal() {
      this.showConfirmModal = false;
      this.$emitter.emit("uncheckInput");
    },
    deleteItem() {
      this.showConfirmModal = false;
      const options = {
        body: JSON.stringify({
          path: this.item.path,
        })
      };
      this.$http.delete(this.getUrl(), options).then((data) => {
        this.$emitter.emit("uncheckInput");
        if (data.result) {
          const status = data.result.status;

          window.showAlert(status, data.result.message);
          this.removeItemFromDirStore(status)
        }
      });
    },
    getUrl() {
      if (this.item.type === "file") {
        return this.settingsStore.baseUrl
            + "disks/"
            + this.item.diskName
            + "/files/"
            + this.getFileNameWithoutExtension(this.item.name);
      }
      else if (this.item.type === "dir") {
        return this.settingsStore.baseUrl
            + "disks/"
            + this.item.diskName
            + "/dirs/"
            + this.item.name
      }
    },
    removeItemFromDirStore(status) {
      if (status === "success") {
        this.dirItemsStore.$patch((state) => {
          const targetDirItems = state.data.find((dirItems) => {
            return (dirItems.diskName === this.item.diskName) && (dirItems.dirName === this.item.dirName);
          });
          targetDirItems.dirItems = targetDirItems.dirItems.filter(item => item.name !== this.item.name);
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
                :confirm-method-on-yes="deleteItem"
                :confirm-method-on-no="hideConfirmModal">

    <template v-slot:confirmQuestion>
      You are about to delete "{{item.name}}"<br> Do you want to delete it?
    </template>
  </ConfirmModal>
</template>

<style scoped>

</style>