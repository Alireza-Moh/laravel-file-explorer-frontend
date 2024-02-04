<script>
import {useSettingsStore} from "@/stores/settingsStore.js";

export default {
  name: "RenameInput",
  emits: ["hideRenameInput"],
  props: {
    dir: Object
  },
  data() {
    return {
      newDirName: this.dir.name,
      settingsStore: useSettingsStore(),
    }
  },
  methods: {
    saveNewDirName() {
      const splitPath = this.dir.path.split('/');

      let newPath = this.newDirName;
      if (splitPath.length > 1) {
        newPath = this.dir.path.replace(this.dir.name, this.newDirName);
      }

      const options = {
        body: JSON.stringify({
          oldPath: this.dir.path,
          newPath: newPath
        })
      };
      const ulr = this.settingsStore.baseUrl
          + "disks/"
          + this.settingsStore.defaultFileExplorerViewData.selectedDisk
          + "/dirs/"
          + this.dir.name;

      this.$http.put(ulr, options).then((data) => {
        if (data.result) {
          const status = data.result.status;

          window.showAlert(status, data.result.message);
          this.$emit("hideRenameInput", status, this.newDirName, newPath);
        }
      });
    }
  }
}
</script>

<template>
  <div class="rename-wrapper">
    <input type="text" class="rename-input" v-model="newDirName" ref="renameInput" autofocus/>
    <img src="../../../assets/img/floppy.svg" alt="rename button" width="12" height="12" @click="saveNewDirName" class="svg-img">
  </div>
</template>

<style scoped>
.rename-wrapper {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>