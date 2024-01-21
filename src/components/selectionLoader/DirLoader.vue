<script>
export default {
  name: "DirLoader",
  props: {
    count: {
      type: Number,
      default: 3
    }
  }
}
</script>

<template>
  <div v-for="i in count" :key="i" class="dir-placeholder shimmer"></div>
</template>

<style scoped>
.dir-placeholder {
  background-color: #F2F2F3;
  height: 36px;
}

body.dark-mode .dir-placeholder {
  background-color: #303134;
}
</style>