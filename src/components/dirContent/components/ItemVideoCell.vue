<script>
import ItemPreviewCellWithRenameInput from "@/components/dirContent/components/ItemPreviewCellWithRenameInput.vue";

export default {
  name: "ItemVideoCell",
  components: {ItemPreviewCellWithRenameInput},
  props: {
    item: Object,
    videoType: String,
    showRenameInput: Boolean
  }
}
</script>

<template>
  <video width="80" height="80" muted>
    <source :src="item.url" :type="videoType" class="video-src">
  </video>

  <ItemPreviewCellWithRenameInput :item="item" :show-rename-input="showRenameInput"/>
</template>

<style scoped>

</style>