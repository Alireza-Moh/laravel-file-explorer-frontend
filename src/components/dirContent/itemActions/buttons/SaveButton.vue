<script>
import {useSettingsStore} from "@/stores/settingsStore.js";

export default {
  name: "SaveButton",
  data() {
    return {
      item: null,
      oldFileName: null,
      settingsStore: useSettingsStore(),
    }
  },
  mounted() {
    this.$emitter.on("sendItemToSave", (item) => {
      this.item = item;
      this.oldFileName = item.name;
    });
  },
  methods: {
    saveNewFileName() {
      const url = this.settingsStore.baseUrl + "disks/" + this.item.diskName + "/files/" + this.getFileNameWithoutExtension();

      this.$http.put(url, this.getRequestOption()).then((data) => {
        this.$emitter.emit("uncheckInput");
        if (data.result) {
          const status = data.result.status;

          if (status === "success") {
            this.item.path = this.getNewPath();
          }
          else if (status === "failed") {
            this.item.name = this.oldFileName;
          }

          window.showAlert(status, data.result.message);
          this.$emitter.emit("hideRenameInput");
        }
      });
    },
    getRequestOption() {
      return  {
        body: JSON.stringify({
          newName: this.item.name,
          oldPath: this.item.path,
          newPath: this.getNewPath()
        })
      };
    },
    getNewPath() {
      const splitPath = this.item.path.split('/');

      let newPath = this.oldFileName;
      if (splitPath.length > 1) {
        newPath = this.item.path.replace(this.oldFileName, this.item.name);
      }

      return newPath;
    },
    getFileNameWithoutExtension() {
      const lastDotIndex = this.oldFileName.lastIndexOf('.');

      if (lastDotIndex === -1) {
        return this.oldFileName;
      } else {
        return this.oldFileName.substring(0, lastDotIndex);
      }
    }
  }
}
</script>

<template>
  <button v-if="item" type="button" class="action-btn" @click="saveNewFileName">
    <img src="../../../../assets/img/floppy.svg" alt="save icon" class="svg-img">
    <span class="action-btn__text item-action-btn__text">Save</span>
  </button>
</template>

<style scoped>

</style>