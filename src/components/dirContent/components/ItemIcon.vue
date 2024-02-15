<script>
export default {
  name: "ItemIcon",
  props: {
    type: {
      type: String
    }
  },
  computed: {
    iconPath() {
      if (this.type === "dir") {
        return "/src/assets/img/folder-fill.svg";
      }
      else if (this.type === "file") {
        return "/src/assets/img/file-earmark-fill.svg";
      }
    }
  }
}
</script>

<template>
  <img :src="iconPath" alt="folder icon">
</template>