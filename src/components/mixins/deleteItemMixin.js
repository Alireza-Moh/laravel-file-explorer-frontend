import {useSettingsStore} from "@/stores/settingsStore.js";
import {useDiskDirsStore} from "@/stores/diskDirsStore.js";
import {useDirItemsStore} from "@/stores/dirItemsStore.js";

export default {
    data() {
        return {
            settingsStore: useSettingsStore(),
            diskDirsStore: useDiskDirsStore(),
            dirItemsStore: useDirItemsStore(),
            diskName: null,
            dirName: null,
            itemsToDelete: [],
            showConfirmModal: false
        }
    },
    methods: {
        deleteSelectedItems(itemType, itemsToDelete = []) {
            return new Promise((resolve, reject) => {
                if (itemsToDelete.length) {
                    this.itemsToDelete = itemsToDelete;
                }
                this.showConfirmModal = false;
                const url = this.getUrlByType(itemType);
                const options = {
                    body: JSON.stringify({
                        items: this.itemsToDelete,
                    })
                };

                this.$http.delete(url, options).then((data) => {
                    this.showErrorModal(data, "Item Deletion Error");
                    if (data.result) {
                        const status = data.result.status;
                        window.showAlert(status, data.result.message);

                        if (status === "success") {
                            this.removeItemFromDirStore();
                            if (itemType === "dir") {
                                this.removeDirFromDiskDirsStore();
                            }
                        }
                    }
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            })
        },
        getUrlByType(itemType) {
            switch (itemType) {
                case "file":
                    return this.settingsStore.baseUrl + "disks/" + this.diskName + "/items/delete";
                case "dir":
                    return this.settingsStore.baseUrl + "disks/" + this.diskName + "/dirs/delete";
                default:
                    throw new InvalidItemType(itemType);
            }
        },
        removeItemFromDirStore() {
            this.dirItemsStore.$patch((state) => {
                const targetDirItems = state.data.find((dirItems) => {
                    return dirItems.diskName === this.diskName && dirItems.dirName === this.dirName;
                });

                const itemsToDeleteNames = this.itemsToDelete.map(item => item.name);
                if (targetDirItems) {
                    targetDirItems.dirItems = targetDirItems.dirItems.filter((item) => {
                        return !itemsToDeleteNames.includes(item.name)
                    });

                    this.settingsStore.replaceItemsForSelectedDir(this.diskName, this.dirName, targetDirItems.dirItems);
                }
            });
        },
        removeDirFromDiskDirsStore() {
            const targetDisk = this.diskDirsStore.getDiskDirs(this.diskName);

            if (targetDisk && targetDisk.dirs) {
                this.findAndDeleteDirByName(targetDisk.dirs);
            }
        },
        findAndDeleteDirByName(dirs) {
            for (let i = 0; i < dirs.length; i++) {
                this.itemsToDelete.forEach(dirToDelete => {
                    const dir = dirs[i];
                    if (dir.name === dirToDelete.name) {
                        dirs.splice(i, 1);
                        return true;
                    } else if (dir.subDir && dir.subDir.length) {
                        const foundFile = this.findAndDeleteDirByName(dir.subDir);
                        if (foundFile) {
                            if (dir.subDir.length === 0) {
                                delete dir.subDir;
                            }
                            return true;
                        }
                    }
                })
            }
            return false;
        }
    }
}