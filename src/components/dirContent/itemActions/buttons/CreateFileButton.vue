<script>
import creationMixin from "@/components/dirContent/itemActions/mixins/creationMixin.js";

export default {
  name: "CreateFileButton",
  mixins: [creationMixin],
  methods: {
    createFile(fileName) {
      if (this.diskName && this.dirName) {
        this.createItem(
            this.settingsStore.baseUrl + "disks/" + this.diskName + "/dirs/" + this.dirName + "/new-file",
            this.selectedDirPath + "/" + fileName,
            this.selectedDirPath
        );
      }
      else {
        window.showAlert("failed", "Disk or directory not found")
      }
    }
  }
}
</script>

<template>
  <button type="button" class="action-btn" @click="openModal">
    <img src="../../../../assets/img/file-earmark-plus.svg" alt="" class="svg-img">
    <span class="action-btn__text item-action-btn__text">Create file</span>
  </button>
  <ItemActionModal v-if="showModal"
                   :function-on-cancel="closeModal"
                   :function-on-save="createFile"
                   label="Enter file name:"
                   :errors="errors"/>
</template>

<style scoped>

</style>