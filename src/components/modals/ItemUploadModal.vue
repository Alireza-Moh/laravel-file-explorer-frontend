<script>
import Alert from "@/components/_baseComponents/Alert.vue";
import UploadItemsList from "@/components/modals/components/UploadItemsList.vue";
import UploadItemsDropBox from "@/components/modals/components/UploadItemsDropBox.vue";
import UploadItemsSetting from "@/components/modals/components/UploadItemsSetting.vue";
import UploadItemsActionButtons from "@/components/modals/components/UploadItemsActionButtons.vue";

export default {
  name: "ItemUploadModal",
  components: {UploadItemsActionButtons, UploadItemsSetting, UploadItemsDropBox, UploadItemsList, Alert},
  data() {
    return {
      items: [],
      ifItemExist: 0,
      maxUploadItems: 10,
      errors: [],
    }
  },
  computed: {
    maxUploadItemsReached() {
      return this.items.length > this.maxUploadItems;
    }
  },
  methods: {
    removeItemFromList(itemName) {
      this.items = this.items.filter(item => item.name !== itemName);
    },
    updateComp(errors) {
      this.errors = errors;
      this.$refs.fileListComp.$forceUpdate()
    }
  }
}
</script>

<template>
  <div class="modal-wrapper">
    <div class="upload-box">
      <div class="header">
        <h3>Upload Files</h3>
      </div>
      <Alert v-if="maxUploadItemsReached"
             type="warning"
             message="Limit: Maximum of 10 files per upload"/>
      <UploadItemsDropBox v-model="items"
                            :max-upload-items-reached="maxUploadItemsReached"/>
      <UploadItemsSetting v-model="ifItemExist"/>
      <UploadItemsList :items="items"
                         :errors="errors"
                         @remove-item="removeItemFromList"
                         ref="fileListComp"/>
      <UploadItemsActionButtons
          :max-upload-items="maxUploadItems"
          :max-upload-items-reached="maxUploadItemsReached"
          :items="items"
          :if-item-exist="ifItemExist"
          @update-items-list-comp="updateComp"/>
    </div>
  </div>
</template>

<style scoped>
.upload-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 10px;
  padding: 2em;
  width: 500px;
  border-radius: 4px;
  z-index: 999;
}

.header {
  text-align: center;
  margin-bottom: 2em;
  color: #929fb1;
  font-size: 22px;
  text-transform: uppercase;
}

.selected {
  color: #000000;
  cursor: default;
}

body.dark-mode .upload-box {
  background-color: #202124;
  box-shadow: 0 5px 10px rgba(0,0,0,0.2);
}

body.dark-mode .modal .input-box input {
  background-color: #303134;
  border: 1px solid #202124;
  color: #f1f3f4;
}
</style>