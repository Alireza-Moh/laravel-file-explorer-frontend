<script>
import {useSettingsStore} from "@/stores/settingsStore.js";
import {useDirItemsStore} from "@/stores/dirItemsStore.js";

export default {
    name: "UploadItemsActionButtons",
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
                const selectedDisk = this.settingsStore.defaultFileExplorerViewData.selectedDisk;
                const selectedDir = this.settingsStore.defaultFileExplorerViewData.selectedDir;

                if (!selectedDisk && !selectedDir) {
                    window.showAlert("failed", "Disk or directory not found");
                    return;
                }

                const url = this.settingsStore.baseUrl
                    + "disks/" + selectedDisk
                    + "/items/upload";
                this.$http.post(url, this.getOptions(), false).then((data) => {
                    this.handleResponse(data, selectedDisk, selectedDir);
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

            return {
                body: formData,
            };
        },
        handleResponse(data, selectedDisk, selectedDir) {
            if (data.errors) {
                this.$emit("passErrorsToItems", data.errors);
                return;
            }
            if (data.result) {
                window.showAlert(data.result.status, data.result.message);
                this.dirItemsStore.updateDir(data.result.items, selectedDisk, selectedDir);
                this.cancel();
            }
        },
        cancel() {
            this.$emitter.emit("closeUploadModal");
        },
    }
}
</script>

<template>
    <div class="button-box">
        <button id="save-btn"
                :class="{selected: maxUploadItemsReached}"
                :disabled="maxUploadItemsReached"
                type="button"
                @click="uploadFiles">
            Save
        </button>
        <button id="cancel-btn"
                type="button"
                @click="cancel">Cancel
        </button>
    </div>
</template>

<style scoped>

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

#save-btn:hover {
    background-color: #4d4dbf;
}
</style>