<script>
export default {
  name: "ContentTableRowLoader",
  props: {
    count: {
      type: Number,
      default: 3
    }
  }
}
</script>

<template>
  <div v-for="i in count" :key="i" class="row-placeholder shimmer"></div>
</template>

<style scoped>
.row-placeholder {
  background-color: #F2F2F3;
  height: 80px;
  margin: 3px 0;
}

body.dark-mode .row-placeholder {
  background-color: #303134;
}
</style>