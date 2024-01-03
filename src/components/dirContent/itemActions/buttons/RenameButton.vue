<script>
export default {
  name: "RenameButton",
  props: {
    item: Object
  },
  methods: {
    renameItem() {
      this.$emitter.emit("showRenameInputForItem", this.item.name);
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