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
            dirItemsStore: useDirItemsStore(),
            spinnerDisplay: 'none',
            disableBtn: false
        }
    },
    methods: {
        uploadFiles() {
            if (this.items.length > 0 && this.items.length <= this.maxUploadItems) {
                this.disableBtn = true;
                this.spinnerDisplay = 'block';
                const selectedDisk = this.settingsStore.defaultFileExplorerViewData.selectedDisk;
                const selectedDir = this.settingsStore.defaultFileExplorerViewData.selectedDir;

                if (!selectedDisk) {
                    window.showAlert("failed", "Disk not found");
                    this.resetButtons();
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
            this.resetButtons();
        },
        resetButtons() {
            this.disableBtn = false;
            this.spinnerDisplay = 'none';
        }
    }
}
</script>

<template>
    <div class="button-box">
        <button id="save-btn"
                :class="{selected: maxUploadItemsReached}"
                :disabled="maxUploadItemsReached || disableBtn"
                type="button"
                @click="uploadFiles">
            Save
        </button>
        <button id="cancel-btn"
                type="button"
                :disabled="disableBtn"
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
    position: relative;
    transition: all 0.2s ease-in-out;
}

#cancel-btn:hover {
    background-color: #c40606;
}

#save-btn:hover {
    background-color: #4d4dbf;
}

#save-btn::after {
    display: v-bind(spinnerDisplay);
    content: "";
    position: absolute;
    width: 14px;
    height: 14px;
    top: 0;
    left: 3px;
    bottom: 0;
    margin: auto;
    border: 4px solid transparent;
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: button-loading-spinner 1s ease infinite;
}

@keyframes button-loading-spinner {
    from {
        transform: rotate(0turn);
    }

    to {
        transform: rotate(1turn);
    }
}

.modal .button-box button:disabled {
    cursor: not-allowed;
    opacity: 0.7;
}
</style>