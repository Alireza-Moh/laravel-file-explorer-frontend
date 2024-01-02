<script>
import storesMixin from "@/mixins/storesMixin.js";
import ConfirmModal from "@/components/_baseComponents/ConfirmModal.vue";
import RenameButton from "@/components/dirContent/itemActions/buttons/RenameButton.vue";
import SaveButton from "@/components/dirContent/itemActions/buttons/SaveButton.vue";
import DeleteButton from "@/components/dirContent/itemActions/buttons/DeleteButton.vue";
import DownloadButton from "@/components/dirContent/itemActions/buttons/DownloadButton.vue";
import CopyButton from "@/components/dirContent/itemActions/buttons/CopyButton.vue";
import CreateDirButton from "@/components/dirContent/itemActions/buttons/CreateDirButton.vue";
import CreateFileButton from "@/components/dirContent/itemActions/buttons/CreateFileButton.vue";
import UploadFilesButton from "@/components/dirContent/itemActions/buttons/UploadFilesButton.vue";

export default {
  name: "ItemActionList",
  components: {
    UploadFilesButton,
    CreateDirButton, CopyButton, DownloadButton, DeleteButton, SaveButton, RenameButton, CreateFileButton, ConfirmModal},
  mixins: [storesMixin],
  data() {
    return {
      showItemActions: false,
      item: null
    }
  },
  mounted() {
    this.$emitter.on("showItemActionList", (item) => {
      this.item = item;
      this.showItemActions = !this.showItemActions;
    });
  }
}
</script>

<template>
  <div class="global-nav">
    <CreateFileButton/>
    <CreateDirButton/>
    <UploadFilesButton/>
    <div v-if="showItemActions" class="related-item-action-wrapper">
      <CopyButton :item="item"/>
      <DownloadButton v-if="item.type === 'file'" :item="item"/>
      <DeleteButton :item="item"/>
      <RenameButton :item="item"/>
      <SaveButton :item="item"/>
    </div>
  </div>
</template>

<style scoped>
.related-item-action-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>