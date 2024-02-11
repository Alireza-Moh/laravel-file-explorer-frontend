<script>
import {useSettingsStore} from "@/stores/settingsStore.js";

export default {
  name: "RenameButton",
  props: {
    items: {
      type: Array
    }
  },
  data() {
    return {
      settingsStore: useSettingsStore(),
      item: {},
      newItemName: ""
    }
  },
  methods: {
    renameItem() {
      if (this.items.length > 1) {
        window.showAlert("warning", "Multiple item renaming is not supported")
      }
      if (this.items.length === 1) {
        this.item = this.items[0];
        this.$emitter.emit(
            "showRenameModal",
            {
              label: "Enter new file name:",
              functionOnSave: this.saveNewItemName,
              errors: {},
              itemName: this.item.name
            }
        );
      }
    },
    saveNewItemName(newItemName) {
      this.newItemName = newItemName;
      const url = this.settingsStore.baseUrl
          + "disks/"
          + this.item.diskName
          + "/items/"
          + this.getFileNameWithoutExtension();

      this.$http.put(url, this.getRequestOption()).then((data) => {
        this.$emitter.emit("uncheckInput");
        this.handleResponse(data);
      });
    },
    getRequestOption() {
      return  {
        body: JSON.stringify({
          oldName: this.item.name,
          newName: this.newItemName,
          oldPath: this.item.path,
          newPath: this.getNewPath()
        })
      };
    },
    getNewPath() {
      return this.item.path.replace(this.item.name, this.newItemName);
    },
    getFileNameWithoutExtension() {
      const lastDotIndex = this.item.name.lastIndexOf('.');

      if (lastDotIndex === -1) {
        return this.item.name;
      } else {
        return this.item.name.substring(0, lastDotIndex);
      }
    },
    handleResponse(data) {
      if (data.result) {
        const status = data.result.status;
        if (status === "success") {
          this.item.path = this.getNewPath();
          this.item.name = this.newItemName;
        }

        window.showAlert(status, data.result.message);
        this.$emitter.emit("hideRenameModal");
      }
      this.showErrors(data);
    },
    showErrors(data) {
      if (data.errors) {
        this.$emitter.emit(
            "showErrorModal",
            {
              headline: "Rename item error",
              errors: data.errors,
              showErrorKey: false
            }
        );
      }
    }
  }
}
</script>

<template>
  <button type="button" class="action-btn" @click="renameItem">
    <img src="@assets/pen.svg" alt="rename button" class="svg-img">
    <span class="action-btn__text item-action-btn__text">Rename</span>
  </button>
</template>

<style scoped>

</style>