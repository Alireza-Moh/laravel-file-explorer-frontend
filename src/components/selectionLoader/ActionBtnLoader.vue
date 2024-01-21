<script>
export default {
  name: "ActionBtnLoader",
  props: {
    count: {
      type: Number,
      default: 3
    }
  }
}
</script>

<template>
  <div v-for="i in count" :key="i" class="disk-placeholder shimmer"></div>
</template>

<style scoped>
.disk-placeholder {
  background-color: #F2F2F3;
  width: 88px;
  height: 34px;
  border-radius: 4px;
}

body.dark-mode .disk-placeholder {
  background-color: #303134;
}
</style>