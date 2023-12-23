<script>
export default {
  name: "ItemActionList"
}
</script>

<template>
  <div class="global-nav">
    <button class="action-btn" id="addFileBtn">
      <img src="../../assets/img/file-earmark-plus.svg" alt="">
      <span class="action-btn__text">Create file</span>
    </button>
    <button class="action-btn" id="addFodlerBtn">
      <img src="../../assets/img/folder-plus.svg" alt="">
      <span class="action-btn__text">Add folder</span>
    </button>
    <button class="action-btn item-related-action">
      <img src="../../assets/img/copy.svg" alt="">
      <span class="action-btn__text">Copy</span>
    </button>
    <button class="action-btn item-related-action">
      <img src="../../assets/img/download.svg" alt="">
      <span class="action-btn__text">Download</span>
    </button>
    <button class="action-btn item-related-action" id="renameBtn">
      <img src="../../assets/img/pen.svg" alt="">
      <span class="action-btn__text">Rename</span>
    </button>
    <button class="action-btn item-related-action">
      <img src="../../assets/img/trash3.svg" alt="">
      <span class="action-btn__text">Delete</span>
    </button>
    <button class="action-btn item-related-action">
      <img src="../../assets/img/floppy.svg" alt="">
      <span class="action-btn__text">Save</span>
    </button>
  </div>
</template>

<style scoped>
.item-related-action {
  display: none;
}
</style>