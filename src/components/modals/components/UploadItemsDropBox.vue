<script>
export default {
  name: "UploadItemsDropBox",
  emits: ["update:modelValue"],
  props: {
    maxUploadItemsReached: {
      type: Boolean
    },
    modelValue: {
      type: undefined
    }
  },
  methods: {
    getSelectedFiles(event) {
      const selectedFiles = Array.from(event.target.files);
      this.$emit("update:modelValue", [...this.modelValue, ...selectedFiles]);
    }
  }
}
</script>

<template>
  <div class="drop-box">
    <div class="image-box">
      <img src="@assets/cloud.png" alt="cloud image">
    </div>
    <button class="select-btn"
            :class="{selected: maxUploadItemsReached}"
            @click="$refs.fileInput.click()"
            :disabled="maxUploadItemsReached">
      Browse Files
    </button>
    <input type="file"
           name="files"
           id="files"
           class="file-input"
           multiple
           ref="fileInput"
           @change="getSelectedFiles">
  </div>
</template>

<style scoped>
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

body.dark-mode .drop-box {
  border: 1px dashed #303134;
}
</style>