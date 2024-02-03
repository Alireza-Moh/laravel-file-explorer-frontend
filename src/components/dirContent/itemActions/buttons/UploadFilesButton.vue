<script>
import FileUploadModal from "@/components/modals/FileUploadModal.vue";

export default {
  name: "UploadFilesButton",
  components: {FileUploadModal},
  data() {
    return {
      showModal: false
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
    <img src="../../../../assets/img/cloud-arrow-up.svg" alt="upload button" class="svg-img">
    <span class="action-btn__text item-action-btn__text">Upload Files</span>
  </button>
  <FileUploadModal v-if="showModal"/>
</template>

<style scoped>

</style>