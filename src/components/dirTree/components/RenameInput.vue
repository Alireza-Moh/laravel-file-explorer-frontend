<script>
import storesMixin from "@/mixins/storesMixin.js";

export default {
  name: "RenameInput",
  mixins: [storesMixin],
  emits: ["hideRenameInput"],
  props: {
    dir: Object
  },
  data() {
    return {
      newDirName: this.dir.label,
    }
  },
  methods: {
    saveNewDirName() {
      const splitPath = this.dir.path.split('/');

      let newPath = this.newDirName;
      if (splitPath.length > 1) {
        newPath = this.dir.path.replace(this.dir.label, this.newDirName);
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
          + "/files/"
          + this.dir.label;

      this.$http.put(ulr, options).then((data) => {
        if (data.result) {
          const status = data.result.status;

          window.showAlert(status, data.result.message);
          this.$emit("hideRenameInput", status, this.newDirName, newPath);
        }
      });
    },
  }
}
</script>

<template>
  <div class="rename-wrapper">
    <input type="text" class="rename-input" v-model="newDirName" ref="renameInput" autofocus/>
    <img src="../../../assets/img/floppy.svg" alt="" width="12" height="12" @click="saveNewDirName">
  </div>
</template>

<style scoped>
.rename-wrapper {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>