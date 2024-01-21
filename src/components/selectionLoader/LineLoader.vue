<script>
export default {
  name: "LineLoader",
  props: {
    count: {
      type: Number,
      default: 1
    }
  }
}
</script>

<template>
  <div v-for="i in count" :key="i" class="line-placeholder shimmer"></div>
</template>

<style scoped>
.line-placeholder {
  background-color: #F2F2F3;
  width: 300px;
  height: 10px;
  border-radius: 4px;
}

body.dark-mode .line-placeholder {
  background-color: #303134;
}
</style>