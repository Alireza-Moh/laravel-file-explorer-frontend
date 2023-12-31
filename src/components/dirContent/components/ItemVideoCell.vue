<script>
import ItemRenameInput from "@/components/dirContent/components/ItemRenameInput.vue";

export default {
  name: "ItemVideoCell",
  components: {ItemRenameInput},
  props: {
    item: Object,
    videoType: String,
    showRenameInput: Boolean
  }
}
</script>

<template>
  <video width="80" height="80" muted>
    <source :src="item.url" :type="videoType">
  </video>

  <ItemRenameInput :item="item" :show-rename-input="showRenameInput"/>
</template>

<style scoped>

</style>