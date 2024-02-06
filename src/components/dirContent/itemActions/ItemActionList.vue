<script>
import RenameButton from "@/components/dirContent/itemActions/buttons/RenameButton.vue";
import SaveButton from "@/components/dirContent/itemActions/buttons/SaveButton.vue";
import DeleteButton from "@/components/dirContent/itemActions/buttons/DeleteButton.vue";
import DownloadButton from "@/components/dirContent/itemActions/buttons/DownloadButton.vue";
import CreateDirButton from "@/components/dirContent/itemActions/buttons/CreateDirButton.vue";
import CreateFileButton from "@/components/dirContent/itemActions/buttons/CreateFileButton.vue";
import UploadFilesButton from "@/components/dirContent/itemActions/buttons/UploadFilesButton.vue";
import {useCheckedItemsStore} from "@/stores/checkedItemsStore.js";

export default {
  name: "ItemActionList",
  components: {
    UploadFilesButton,
    CreateDirButton,
    DownloadButton,
    DeleteButton,
    SaveButton,
    RenameButton,
    CreateFileButton
  },
  data() {
    return {
      showItemActions: false,
      items: [],
      item: null,
      checkedItemsStore: useCheckedItemsStore()
    }
  },
  mounted() {
    this.checkedItemsStore.$subscribe((mutation, state) => {
      this.items = state.items;
      const length = state.items.length;
      this.showItemActions = length > 0;
      if (length === 0) {
        this.$emitter.emit("hideRenameInput");
      }
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
      <DownloadButton :items="items"/>
      <DeleteButton :items="items"/>
      <RenameButton :items="items"/>
      <SaveButton/>
    </div>
  </div>
</template>

<style>
.related-item-action-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

@media screen and (max-width: 1000px){
  .item-action-btn__text {
    display: none;
  }
}
</style>