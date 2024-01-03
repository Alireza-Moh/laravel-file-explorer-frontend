<script>
import creationMixin from "@/components/dirContent/itemActions/mixins/creationMixin.js";

export default {
  name: "CreateDirButton",
  mixins: [creationMixin],
  methods: {
    createDir(dirName) {
      this.createItem(
          this.settingsStore.baseUrl + "disks/" + this.diskName + "/dirs/" + this.dirName + "/new-dir",
          this.dirName + "/" + dirName,
          "dir"
      );
    }
  }
}
</script>

<template>
  <button type="button" class="action-btn" id="addFileBtn" @click="openModal">
    <img src="../../../../assets/img/folder-plus.svg" alt="create icon" class="svg-img">
    <span class="action-btn__text item-action-btn__text">Create directory</span>
  </button>
  <ItemActionModal
      v-if="showModal"
      :function-on-cancel="closeModal"
      :function-on-save="createDir"
      label=" Enter directory name:"/>
</template>

<style scoped>

</style>