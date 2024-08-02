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
        deleteSelectedItems() {
            this.showConfirmModal = false;
            const url = "disks/" + this.diskName + "/all/items/delete";
            const options = {
                items: this.itemsToDelete
            };

            this.$API.post(url, options).then(response => {
                window.showAlert(response.data.status, response.data.message);
                this.removeItemFromDirStore();
                this.removeDirFromDiskDirsStore();
            }).catch(error => {
                window.showAlert(error.response.data.status, error.response.data.message);
            });
        },
        removeItemFromDirStore() {
            this.dirItemsStore.$patch((state) => {
                const targetDirItems = state.data.find((dirItems) => {
                    return dirItems.diskName === this.diskName && dirItems.selectedDirPath === this.dirName;
                });

                const itemNamesToDelete = this.itemsToDelete.map(item => item.name);
                if (targetDirItems) {
                    targetDirItems.dirItems = targetDirItems.dirItems.filter((item) => {
                        return !itemNamesToDelete.includes(item.name)
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
                    if (dirToDelete.type === 'dir') {
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
                    }
                })
            }
            return false;
        }
    }
}