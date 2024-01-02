<script>
import storesMixin from "@/mixins/storesMixin.js";
import Alert from "@/components/_baseComponents/Alert.vue";

export default {
  name: "FileUploadModal",
  components: {Alert},
  emits: ["closeModal"],
  mixins: [storesMixin],
  data() {
    return {
      files: [],
      ifFileExist: 0,
      errors: [],
      maxUploadFile: 10
    }
  },
  computed: {
    maxUploadFilesReached() {
      return this.files.length > this.maxUploadFile;
    }
  },
  methods: {
    selectFiles(event) {
      const selectedFiles = Array.from(event.target.files);
      const uniqueFiles = selectedFiles.filter(file => !this.files.some(existingFile => existingFile.name === file.name));

      this.files = [...this.files, ...uniqueFiles];
    },
    removeFile(index) {
      this.files.splice(index, 1);
    },
    uploadFiles() {
      if (this.files.length > 0 && this.files.length <= this.maxUploadFile) {
        const selectedDisk = this.settingsStore.defaultFileExplorerViewData.selectedDisk;
        const selectedDir = this.settingsStore.defaultFileExplorerViewData.selectedDir;
        const url = this.settingsStore.baseUrl
            + "disks/" + selectedDisk
            + "/files/upload";

        const headers = {
          method: "POST",
          headers: {
            "Accept": "application/json"
          },
        };

        this.$http.post(url, this.getOptions(), headers).then((data) => {
          if (data.errors) {
            this.errors = data.errors;
            return;
          }
          if (data.result) {
            window.showAlert(data.result.status, data.result.message);
            this.dirItemsStore.updateDir(data.result.items, selectedDisk, selectedDir);
            this.cancel();
          }
        });
      }
    },
    getOptions() {
      const formData = new FormData();

      formData.append("ifFileExist", this.ifFileExist);
      formData.append("destination", this.settingsStore.defaultFileExplorerViewData.selectedDirPath)
      for (let i = 0; i < this.files.length; i++) {
        formData.append("files[]", this.files[i]);
      }

      return {
        body: formData,
      };
    },
    cancel() {
      this.$emit("closeModal");
    }
  }
}
</script>

<template>
  <div class="upload-box">
    <div class="header">
      <h3>Upload Files</h3>
    </div>
    <Alert v-if="maxUploadFilesReached"
           type="warning"
           message="Limit: Maximum of 10 files per upload"/>
    <div class="drop-box">
      <div class="image-box">
        <img src="../../assets/img/cloud.png" alt="cloud image">
      </div>
      <button class="select-btn"
              :class="{selected: maxUploadFilesReached}"
              @click="$refs.fileInput.click()"
              :disabled="maxUploadFilesReached">
        Browse Files
      </button>
      <input type="file"
             name="files"
             id="files"
             class="file-input"
             multiple
             ref="fileInput"
             @change="selectFiles">
    </div>
    <div class="radio-wrapper">
      <h5>If file exist:</h5>
      <div class="inner-wrapper">
        <div class="radio-box">
          <label for="skip">Skip</label>
          <input type="radio" name="fileExist" id="skip" value="0" v-model="ifFileExist">
        </div>
        <div class="radio-box">
          <label for="overwrite">Overwrite</label>
          <input type="radio" name="fileExist" id="overwrite" value="1" v-model="ifFileExist">
        </div>
      </div>
    </div>
    <div v-if="files.length > 0" class="selected-files-box">
      <div class="headline">
        <p>Selected Files:</p>
      </div>
      <div class="files-box">
        <div v-for="(file, index) in files"
             :key="index">
          <div class="file">
            <span>{{file.name}}</span>
            <span class="delete-icon" @click="removeFile(index)">X</span>
          </div>
          <template v-for="(error, index) in Object.keys(errors)" :key="index">
            <div class="error" v-if="error === file.name">
              {{errors[error][0]}}
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="button-box">
      <button type="button"
              id="save-btn"
              @click="uploadFiles"
              :class="{selected: maxUploadFilesReached}"
              :disabled="maxUploadFilesReached">
        Save
      </button>
      <button type="button" id="cancel-btn" @click="cancel">Cancel</button>
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

.drop-box {
  border: 1px dashed #929fb1;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2em;
  cursor: pointer;
}

.image-box {
  width: 100px;
  height: 100px;
}

.image-box img {
  width: 100%;
  height: 100%;
}

.select-btn {
  border: none;
  border-radius: 4px;
  padding: 8px 30px;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: #7071E8;
}

.select-btn:hover  {
  background-color: #4d4dbf;
}

.file-input {
  display: none;
}

.selected-files-box {
  margin-top: 1em;
}

.selected-files-box .headline {
  font-weight: bold;
  font-size: 18px;
  color: #929fb1;
}

.files-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 1em;
  max-height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 10px 10px 10px 0;
}

.file {
  background-color: #F2F2F3;
  padding: 6px 15px;
  border-radius: 4px;
  color: #000000;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.button-box {
  display: flex;
  justify-content: flex-end;
  margin-top: 1em;
}

button {
  border: none;
  border-radius: 4px;
  padding: 8px 30px;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
}

#cancel-btn {
  background-color: #FE0000;
  transition: all 0.3s linear;
}

#save-btn {
  background-color: #7071E8;
  margin-right: 10px;
  transition: all 0.2s ease-in-out;
}

 #cancel-btn:hover {
  background-color: #c40606;
}

#save-btn:hover  {
  background-color: #4d4dbf;
}

.radio-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 1em 0;
  padding: 5px 0;
}

.radio-wrapper h5 {
  color: #929fb1;
  font-size: 17px;
}

.inner-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5em;
}

.radio-box {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  accent-color: #7071E8;
  color: #000000;
}

.error {
  margin-bottom: 1em;
  padding-left: 3px;
}

.selected {
  color: #000000;
  cursor: default;
}

body.dark-mode .upload-box {
  background-color: #202124;
  box-shadow: 0 5px 10px rgba(0,0,0,0.2);
}

body.dark-mode .drop-box {
  border: 1px dashed #202124;
}

body.dark-mode .modal .input-box input {
  background-color: #303134;
  border: 1px solid #202124;
  color: #f1f3f4;
}

body.dark-mode .radio-box {
  color: #f1f3f4;
}

body.dark-mode .file {
  background-color: #303134;
  color: #bdc1c6;
}
</style>