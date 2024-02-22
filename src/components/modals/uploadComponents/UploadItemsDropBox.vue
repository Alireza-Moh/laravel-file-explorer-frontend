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
            <img alt="cloud image" src="@assets/cloud.png">
        </div>
        <button :class="{selected: maxUploadItemsReached}"
                :disabled="maxUploadItemsReached"
                class="select-btn"
                @click="$refs.fileInput.click()">
            Browse Files
        </button>
        <input id="files"
               ref="fileInput"
               class="file-input"
               multiple
               name="files"
               type="file"
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

.select-btn:hover {
    background-color: #4d4dbf;
}

.file-input {
    display: none;
}

body.dark-mode .drop-box {
    border: 1px dashed #303134;
}
</style>