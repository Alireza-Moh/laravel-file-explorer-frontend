<script>
import storesMixin from "@/mixins/storesMixin.js";

export default {
  name: "DownloadButton",
  mixins: [storesMixin],
  props: {
    items: Object
  },
  data() {
    return {
      diskName: null
    }
  },
  created() {
    this.diskName = this.settingsStore.defaultFileExplorerViewData.selectedDisk
  },
  methods: {
    download() {
      const url = this.settingsStore.baseUrl + "disks/" + this.diskName + "/files/download";
      const options = {
        body: JSON.stringify({
          files: this.getFormData()
        })
      };

      this.$http.postBlob(url, options).then((blob) => {
        if (blob.result) {
          window.showAlert(blob.result.status, blob.result.message);
        }
        else {
         this.createDownloadLink(blob);
        }
        this.$emitter.emit("uncheckInput");
        this.checkedItemsStore.items = [];
      });
    },
    getFormData() {
      let filesToDownload = [];

      this.items.forEach(item => {
        filesToDownload.push({
          path: item.path,
          type: item.type
        })
      });

      return filesToDownload;
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
      let downloadFileName = "";

      if (this.items.length === 1) {
        downloadFileName = this.items[0].name
      }
      else {
        downloadFileName = this.diskName + "_files";
      }

      return downloadFileName;
    }
  }
}
</script>

<template>
  <button type="button" class="action-btn" @click="download">
    <img src="../../../../assets/img/download.svg" alt="download icon" class="svg-img">
    <span class="action-btn__text item-action-btn__text">Download</span>
  </button>
</template>

<style scoped>

</style>