<script>
import storesMixin from "@/mixins/storesMixin.js";
import itemActionMixin from "@/components/itemActions/mixins/itemActionMixin.js";

export default {
  name: "SaveButton",
  mixins: [storesMixin, itemActionMixin],
  props: {
    item: Object
  },
  data() {
    return {
      oldFileName: this.item?.name,
    }
  },
  methods: {
    saveNewFileName() {
      const url = this.settingsStore.baseUrl + "disks/" + this.item.diskName + "/dirs/" + this.getFileNameWithoutExtension(this.oldFileName);

      this.$http.put(url, this.getRequestOption()).then((data) => {
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
    }
  }
}
</script>

<template>
  <button type="button" class="action-btn" @click="saveNewFileName">
    <img src="../../../assets/img/floppy.svg" alt="">
    <span class="action-btn__text">Save</span>
  </button>
</template>

<style scoped>

</style>