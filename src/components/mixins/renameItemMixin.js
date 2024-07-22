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
                + "/items/rename"

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
                    newPath: this.getNewPath(),
                    type: this.item.type,
                    dirName: this.item.dirName
                })
            };
        },
        getNewPath() {
            return this.item.path.replace(this.item.name, this.newItemName);
        },
        handleResponse(data) {
            if (data.result) {
                const status = data.status;
                if (status === "success") {
                    this.updateItemInStore(data.result.updatedItem);
                }

                window.showAlert(status, data.message);
                this.$emitter.emit("hideRenameModal");
            }
            this.showErrorModal(data, "Rename item error");
        },
        updateItemInStore(updatedItem) {
            useDirItemsStore().updateItem(
                this.item.diskName,
                this.item.dirName,
                this.item.name,
                updatedItem
            );
            if (this.item.type === "dir") {
                useDiskDirsStore().updateDirMetadataByName(
                    this.item.diskName,
                    this.oldItemName,
                    {
                        dirName: updatedItem.dirName,
                        diskName: updatedItem.diskName,
                        name: updatedItem.name,
                        path: updatedItem.path
                    }
                );
            }
        }
    }
}