<script>
import storesMixin from "@/mixins/storesMixin.js";
import Alert from "@/components/_baseComponents/Alert.vue";
import UploadedFilesList from "@/components/modals/components/UploadedFilesList.vue";
import UploadedFilesDropBox from "@/components/modals/components/UploadedFilesDropBox.vue";
import UploadedFilesSetting from "@/components/modals/components/UploadedFilesSetting.vue";
import UploadedFilesActionButtons from "@/components/modals/components/UploadedFilesActionButtons.vue";

export default {
  name: "FileUploadModal",
  components: {UploadedFilesActionButtons, UploadedFilesSetting, UploadedFilesDropBox, UploadedFilesList, Alert},
  mixins: [storesMixin],
  data() {
    return {
      files: [],
      ifFileExist: 0,
      maxUploadFile: 10,
      errors: [],
    }
  },
  computed: {
    maxUploadFilesReached() {
      return this.files.length > this.maxUploadFile;
    }
  },
  methods: {
    removeFile(fileName) {
      this.files = this.files.filter(file => file.name !== fileName);
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
      <Alert v-if="maxUploadFilesReached"
             type="warning"
             message="Limit: Maximum of 10 files per upload"/>
      <UploadedFilesDropBox v-model="files"
                            :max-upload-files-reached="maxUploadFilesReached"/>
      <UploadedFilesSetting v-model="ifFileExist"/>
      <UploadedFilesList :files="files"
                         :errors="errors"
                         @remove-file="removeFile"
                         ref="fileListComp"/>
      <UploadedFilesActionButtons
          :max-upload-file="maxUploadFile"
          :max-upload-files-reached="maxUploadFilesReached"
          :files="files"
          :if-file-exist="ifFileExist"
          @update-files-list-comp="updateComp"/>
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