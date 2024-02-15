<script>
export default {
  name: "ItemImageCell",
  props: {
    itemUrl: {
      type: String
    }
  }
}
</script>

<template>
  <div class="thumbnail-box">
    <div class="thumbnail-image-box">
      <img :src="itemUrl"
           alt="img"
           class="thumbnail">
    </div>
  </div>
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