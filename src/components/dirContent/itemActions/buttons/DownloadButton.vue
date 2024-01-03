<script>
import storesMixin from "@/mixins/storesMixin.js";

export default {
  name: "DownloadButton",
  mixins: [storesMixin],
  props: {
    item: Object
  },
  methods: {
    download() {
      if (this.item.type === "file") {
        const url = this.settingsStore.baseUrl
            + "disks/" + this.item.diskName
            + "/dirs/" + this.item.dirName
            + "/files/" + this.item.name.replace("." + this.item.extension.toLowerCase(), "")
            + "/download";

        const options = {
          body: JSON.stringify({
            path: this.item.path,
            type: this.item.type
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
        });
      }
    },
    createDownloadLink(blob) {
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;

      link.setAttribute('download', this.item.name);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }
}
</script>

<template>
  <button type="button" class="action-btn" @click="download">
    <img src="../../../../assets/img/download.svg" alt="download icon" class="svg-img">
    <span class="action-btn__text">Download</span>
  </button>
</template>

<style scoped>

</style>