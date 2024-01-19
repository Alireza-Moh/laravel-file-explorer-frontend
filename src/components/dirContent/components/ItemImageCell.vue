<script>
import ItemPreviewCellWithRenameInput from "@/components/dirContent/components/ItemPreviewCellWithRenameInput.vue";

export default {
  name: "ItemImageCell",
  components: {ItemPreviewCellWithRenameInput},
  props: {
    item: Object,
    showRenameInput: Boolean
  }
}
</script>

<template>
  <div class="thumbnail-box">
    <div class="thumbnail-image-box">
      <img :src="item.url" alt="img" class="thumbnail">
    </div>
  </div>

  <ItemPreviewCellWithRenameInput :item="item" :show-rename-input="showRenameInput"/>
</template>

<style scoped>
.thumbnail-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.thumbnail-image-box {
  width: 70px;
  height: 70px;
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>