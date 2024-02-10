<script>
import {useSettingsStore} from "@/stores/settingsStore.js";

export default {
  name: "SaveButton",
  data() {
    return {
      item: null,
      oldItemName: null,
      settingsStore: useSettingsStore(),
    }
  },
  mounted() {
    this.$emitter.on("sendItemToSave", (item) => {
      this.item = item;
      this.oldItemName = item.name;
    });
  },
  methods: {
    saveNewFileName() {
      const url = this.settingsStore.baseUrl
          + "disks/"
          + this.item.diskName
          + "/items/"
          + this.getFileNameWithoutExtension();

      this.$http.put(url, this.getRequestOption()).then((data) => {
        this.$emitter.emit("uncheckInput");
        if (data.result) {
          const status = data.result.status;

          if (status === "success") {
            this.item.path = this.getNewPath();
          }
          else if (status === "failed") {
            this.item.name = this.oldItemName;
          }

          window.showAlert(status, data.result.message);
          this.$emitter.emit("hideRenameInput");
        }
        if (data.errors) {
          this.$emitter.emit(
              "showErrorModal",
              {
                headline: "Rename Errors",
                errors: data.errors,
                showErrorKey: false
              }
          );
          this.item.name = this.oldItemName;
        }
      });
    },
    getRequestOption() {
      return  {
        body: JSON.stringify({
          oldName: this.oldItemName,
          newName: this.item.name,
          oldPath: this.item.path,
          newPath: this.getNewPath()
        })
      };
    },
    getNewPath() {
      return this.item.path.replace(this.oldItemName, this.item.name);
    },
    getFileNameWithoutExtension() {
      const lastDotIndex = this.oldItemName.lastIndexOf('.');

      if (lastDotIndex === -1) {
        return this.oldItemName;
      } else {
        return this.oldItemName.substring(0, lastDotIndex);
      }
    }
  }
}
</script>

<template>
  <button v-if="item" type="button" class="action-btn" @click="saveNewFileName">
    <img src="@assets/floppy.svg" alt="save icon" class="svg-img">
    <span class="action-btn__text item-action-btn__text">Save</span>
  </button>
</template>

<style scoped>

</style>