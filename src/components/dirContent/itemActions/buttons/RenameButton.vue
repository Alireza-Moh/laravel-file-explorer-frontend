<script>
export default {
  name: "RenameButton",
  props: {
    items: Object
  },
  methods: {
    renameItem() {
      if (this.items.length > 1) {
        window.showAlert("warning", "Multiple item renaming is not supported")
      }
      else {
        if (this.items.length) {
          const item = this.items[0];

          this.$emitter.emit("showRenameInputForItem", item.name);
          this.$emitter.emit("sendItemToSave", item);
        }
      }
    },
  }
}
</script>

<template>
  <button type="button" class="action-btn" @click="renameItem">
    <img src="../../../../assets/img/pen.svg" alt="rename button" class="svg-img">
    <span class="action-btn__text item-action-btn__text">Rename</span>
  </button>
</template>

<style scoped>

</style>