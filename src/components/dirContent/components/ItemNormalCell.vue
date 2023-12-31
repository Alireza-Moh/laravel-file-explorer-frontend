<script>
export default {
  name: "ItemNormalCell"
}
</script>

<template>
  <input v-if="showRenameInput"
         type="text"
         class="rename-input"
         v-model="item.name"
         autofocus>
  <span v-else>{{item.name}}</span>
</template>

<style scoped>

</style>