<script>
import {useSettingsStore} from "@/stores/settingsStore.js";
import {useDirItemsStore} from "@/stores/dirItemsStore.js";
import Button from "@/components/_baseComponents/Button.vue";

export default {
    name: "UploadItemsActionButtons",
    components: {Button},
    emits: ["passErrorsToItems"],
    props: {
        maxUploadItems: {
            type: Number
        },
        maxUploadItemsReached: {
            type: Boolean
        },
        ifItemExist: {
            type: Number
        },
        items: {
            type: Array
        }
    },
    data() {
        return {
            settingsStore: useSettingsStore(),
            dirItemsStore: useDirItemsStore()
        }
    },
    methods: {
        uploadFiles() {
            if (this.items.length > 0 && this.items.length <= this.maxUploadItems) {
                this.$emitter.emit("setButtonAnimation");
                const selectedDisk = this.settingsStore.defaultFileExplorerViewData.selectedDisk;
                const selectedDir = this.settingsStore.defaultFileExplorerViewData.selectedDir;

                if (!selectedDisk) {
                    window.showAlert("failed", "Disk not found");
                    this.$emitter.emit("resetButtonAnimation");
                    return;
                }

                const url = "disks/" + selectedDisk + "/items/upload";

                this.$API.post(url, this.getOptions()).then(response => {
                    if (response.data.result) {
                        window.showAlert(response.data.status, response.data.message);
                        this.dirItemsStore.replaceItemsInDir(response.data.result.items, selectedDisk, selectedDir);
                        this.cancel();
                    }
                }).catch(error => {
                    this.$emit("passErrorsToItems", error.response.data.errors);
                    window.showAlert(error.response.data.status, error.response.data.message);

                    if (error.response.status === 403) {
                        this.cancel();
                    }
                });
            }
        },
        getOptions() {
            const formData = new FormData();

            formData.append("ifItemExist", this.ifItemExist);
            formData.append("destination", this.settingsStore.defaultFileExplorerViewData.selectedDirPath)
            for (let i = 0; i < this.items.length; i++) {
                formData.append("items[]", this.items[i]);
            }

            return formData;
        },
        cancel() {
            this.$emitter.emit("closeUploadModal");
            this.$emitter.emit("resetButtonAnimation");
        }
    }
}
</script>

<template>
    <div class="button-box">
        <Button text="Save"
                :disabled="maxUploadItemsReached"
                :on-click="uploadFiles"/>

        <Button text="Cancel"
                type="cancel"
                :on-click="cancel"/>
    </div>
</template>

<style scoped>

.button-box {
    display: flex;
    justify-content: flex-end;
    margin-top: 1em;
}
</style>