<script>
import MultipleErrorModal from "@/components/modals/MultipleErrorModal.vue";
import {useSettingsStore} from "@/stores/settingsStore.js";
import {useCheckedItemsStore} from "@/stores/checkedItemsStore.js";

export default {
  name: "DownloadButton",
  components: {MultipleErrorModal},
  props: {
    items: Object
  },
  data() {
    return {
      diskName: null,
      errors: {},
      showErrorModal: false,
      settingsStore: useSettingsStore(),
      checkedItemsStore: useCheckedItemsStore(),
    }
  },
  created() {
    this.diskName = this.settingsStore.defaultFileExplorerViewData.selectedDisk
  },
  methods: {
    download() {
      const containsDir = this.items.some(item => item.type === 'dir');
      if (containsDir) {
        window.showAlert("failed", "Directory download is not supported");
      }
      else {
        this.startDownload();
      }
    },
    startDownload(){
      const url = this.settingsStore.baseUrl + "disks/" + this.diskName + "/files/download";
      const options = {
        body: JSON.stringify({
          items: this.getFormData()
        })
      };

      this.$http.postBlob(url, options).then((blob) => {
        this.handleDownloadResponse(blob);

        this.$emitter.emit("uncheckInput");
        this.checkedItemsStore.items = [];
      });
    },
    handleDownloadResponse(blob) {
      if (blob.errors) {
        this.errors = blob.errors;
        this.showErrorModal = true;
      }
      if (blob.result) {
        window.showAlert(blob.result.status, blob.result.message);
      }
      if (blob instanceof Blob) {
        this.createDownloadLink(blob);
      }
    },
    getFormData() {
      return this.items.map(item => ({
        name: item.name.replace("." + item.extension, ""),
        path: item.path,
        type: item.type
      }));
    },
    createDownloadLink(blob) {
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;

      link.setAttribute('download', this.getDownloadFileName());
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
    getDownloadFileName() {
      return this.items.length === 1 ? this.items[0].name : this.diskName + "_items";
    },
    hideErrorModal() {
      this.showErrorModal = false;
      this.errors = {};
    }
  }
}
</script>

<template>
  <button type="button" class="action-btn" @click="download">
    <img src="@assets/download.svg" alt="download icon" class="svg-img">
    <span class="action-btn__text item-action-btn__text">Download</span>
  </button>
  <MultipleErrorModal v-if="showErrorModal"
                      :errors="errors"
                      @hide-error-modal="hideErrorModal"/>
</template>

<style scoped>

</style>