<script>
import storesMixin from "@/mixins/storesMixin.js";
import ConfirmModal from "@/components/_baseComponents/ConfirmModal.vue";
import RenameButton from "@/components/_baseComponents/itemActions/buttons/RenameButton.vue";
import SaveButton from "@/components/_baseComponents/itemActions/buttons/SaveButton.vue";
import DeleteButton from "@/components/_baseComponents/itemActions/buttons/DeleteButton.vue";
import DownloadButton from "@/components/_baseComponents/itemActions/buttons/DownloadButton.vue";
import CopyButton from "@/components/_baseComponents/itemActions/buttons/CopyButton.vue";
import CreateDirButton from "@/components/_baseComponents/itemActions/buttons/CreateDirButton.vue";
import CreateFileButton from "@/components/_baseComponents/itemActions/buttons/CreateFileButton.vue";

export default {
  name: "ItemActionList",
  components: {CreateDirButton, CopyButton, DownloadButton, DeleteButton, SaveButton, RenameButton, CreateFileButton, ConfirmModal},
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
    <div v-if="showItemActions" class="related-item-action-wrapper">
      <CopyButton :item="item"/>
      <DownloadButton :item="item"/>
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