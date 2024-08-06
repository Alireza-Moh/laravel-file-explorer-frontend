<script>
import creationMixin from "@/components/dirContent/itemActions/mixins/creationMixin.js";

export default {
    name: "CreateDirButton",
    mixins: [creationMixin],
    methods: {
        openModal() {
            this.$emitter.emit(
                "showRenameModal",
                {
                    label: "Enter directory name:",
                    functionOnSave: this.createDir,
                    itemName: ""
                }
            );
        },
        createDir(dirName) {
            if (this.diskName) {
                this.createItem(
                    this.settingsStore.baseUrl + "disks/" + this.diskName + "/new-dir",
                    this.selectedDirPath ? (this.selectedDirPath + "/" + dirName) : dirName,
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
    <button id="addFileBtn" class="action-btn" type="button" @click="openModal">
        <img alt="create icon" class="svg-img" src="@assets/folder-plus.svg">
        <span class="action-btn__text item-action-btn__text">Create directory</span>
    </button>
</template>