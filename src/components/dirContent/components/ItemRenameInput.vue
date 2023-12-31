<script>
export default {
  name: "ItemRenameInput",
  props: {
    item: Object,
    showRenameInput: Boolean
  }
}
</script>

<template>
  <input v-if="showRenameInput" type="text"
         class="rename-input"
         v-model="item.name"
         autofocus>
  <span v-else>{{item.name}}</span>
</template>

<style scoped>

</style>