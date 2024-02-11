<script>
import ItemUploadModal from "@/components/modals/ItemUploadModal.vue";

export default {
  name: "UploadFilesButton",
  components: {ItemUploadModal},
  data() {
    return {
      showModal: false,
    }
  },
  mounted() {
    this.$emitter.on("closeUploadModal", () => {
      this.showModal = false;
    });
  }
}
</script>

<template>
  <button type="button" class="action-btn" @click="showModal = true">
    <img src="@assets/cloud-arrow-up.svg" alt="upload button" class="svg-img">
    <span class="action-btn__text item-action-btn__text">Upload Files</span>
  </button>
  <ItemUploadModal v-if="showModal"/>
</template>