<script>
import creationMixin from "@/components/dirContent/itemActions/mixins/creationMixin.js";

export default {
    name: "CreateFileButton",
    mixins: [creationMixin],
    methods: {
        openModal() {
            this.$emitter.emit(
                "showRenameModal",
                {
                    label: "Enter file name:",
                    functionOnSave: this.createFile,
                    itemName: ""
                }
            );
        },
        createFile(fileName) {
            if (this.diskName && this.dirName) {
                this.createItem(
                    this.settingsStore.baseUrl + "disks/" + this.diskName + "/dirs/" + this.dirName + "/new-file",
                    this.selectedDirPath + "/" + fileName,
                    this.selectedDirPath
                );
            } else {
                window.showAlert("failed", "Disk or directory not found")
            }
        }
    }
}
</script>

<template>
    <button class="action-btn" type="button" @click="openModal">
        <img alt="" class="svg-img" src="@assets/file-earmark-plus.svg">
        <span class="action-btn__text item-action-btn__text">Create file</span>
    </button>
</template>