import {useDirItemsStore} from "@/stores/dirItemsStore.js";
import {useDiskDirsStore} from "@/stores/diskDirsStore.js";
import {useSettingsStore} from "@/stores/settingsStore.js";
import globalMixin from "@/components/mixins/globalMixin.js";

export default {
    mixins: [globalMixin],
    data() {
        return {
            settingsStore: useSettingsStore(),
            newItemName: "",
            oldItemName: ""
        }
    },
    methods: {
        saveNewItemName(newItemName) {
            this.newItemName = newItemName;
            const url = this.settingsStore.baseUrl
                + "disks/"
                + this.item.diskName
                + "/dirs/"
                + this.getFileNameWithoutExtension();

            this.$http.post(url, this.getRequestOption()).then((data) => {
                this.$emitter.emit("uncheckInput");
                this.handleResponse(data);
            });
        },
        getRequestOption() {
            return  {
                body: JSON.stringify({
                    oldName: this.item.name,
                    newName: this.newItemName,
                    oldPath: this.item.path,
                    newPath: this.getNewPath()
                })
            };
        },
        getNewPath() {
            return this.item.path.replace(this.item.name, this.newItemName);
        },
        getFileNameWithoutExtension() {
            const lastDotIndex = this.item.name.lastIndexOf('.');

            if (lastDotIndex === -1) {
                return this.item.name;
            } else {
                return this.item.name.substring(0, lastDotIndex);
            }
        },
        handleResponse(data) {
            if (data.result) {
                const status = data.result.status;
                if (status === "success") {
                    this.updateItemInStore();
                }

                window.showAlert(status, data.result.message);
                this.$emitter.emit("hideRenameModal");
            }
            this.showErrorModal(data, "Rename item error");
        },
        updateItemInStore() {
            useDirItemsStore().updateItem(
                this.item.diskName,
                this.item.dirName,
                this.item.name,
                this.getUpdatedMetadata()
            );
            if (this.item.type === "dir") {
                useDiskDirsStore().updateDirMetadataByName(
                    this.item.diskName,
                    this.getUpdatedMetadata(),
                    this.oldItemName
                );
            }
        },
        getUpdatedMetadata() {
            let commonMetadata = {
                name: this.newItemName,
                path: this.getNewPath()
            }
            if (this.item.type === "file") {
                commonMetadata["url"] = this.item.url.replace(this.item.name, this.newItemName)
            }

            return commonMetadata;
        }
    }
}