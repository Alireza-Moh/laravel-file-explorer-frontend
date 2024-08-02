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

            this.$API.fetchCsrfToken().then(response => {
                this.$API.post(url, this.getRequestOption(response)).then((data) => {
                    this.updateItemInStore(data.data.result.updatedItem);
                    window.showAlert(data.data.status, data.data.message);
                }).catch(error => {
                    this.showErrorModal(error.response.data, "Rename item error");
                    window.showAlert(error.response.data.status, error.response.data.message);
                }).finally(() => {
                    this.$emitter.emit("uncheckInput");
                    this.$emitter.emit("hideRenameModal");
                });
            });
        },
        getRequestOption(response) {
            return  {
                oldName: this.item.name,
                newName: this.newItemName,
                oldPath: this.item.path,
                newPath: this.getNewPath(),
                type: this.item.type,
                parent: this.item.parent,
                _token: response.data.data.csrfToken
            };
        },
        getNewPath() {
            return this.item.path.replace(this.item.name, this.newItemName);
        },
        updateItemInStore(updatedItem) {
            useDirItemsStore().updateItem(updatedItem, this.oldItemName);
            useSettingsStore().updateItemForSelectedDir(updatedItem, this.oldItemName);

            if (this.item.type === "dir") {
                useSettingsStore().updateDirForSelectedDisk(updatedItem, this.oldItemName);
                useDiskDirsStore().updateDiskDirs(updatedItem, this.oldItemName);
            }
        }
    }
}