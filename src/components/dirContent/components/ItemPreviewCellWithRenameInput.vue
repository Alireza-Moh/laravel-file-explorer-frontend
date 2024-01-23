<script>
export default {
  name: "ItemPreviewCellWithRenameInput",
  props: {
    item: Object,
    showRenameInput: Boolean
  }
}
</script>

<template>
  <input v-if="showRenameInput"
         type="text"
         class="rename-input"
         v-model="item.name"
         autofocus>
  <span v-else class="item-name">{{item.name}}</span>
</template>

<style scoped>

</style>