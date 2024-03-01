import {defineStore} from "pinia";

export const useDiskDirsStore = defineStore("diskDirs", {
    state: () => ({
        dirs: []
    }),

    getters: {
        getDiskDirs: (state) => (diskName) => {
            return state.dirs.find((d) => {
                return d.diskName === diskName
            });
        },
    },
    actions: {
        addDiskDirs(diskData) {
            this.dirs.push(diskData);
        },
        replaceDirsForDisk(diskName, dirs) {
            const targetDisk = this.dirs.find((disk) => {
                return (disk.diskName === diskName);
            });

            if (targetDisk && targetDisk.dirs) {
                targetDisk.dirs = dirs;
            }
        },
        updateDirMetadataByName(diskName, oldItemName, updatedItem) {
            const targetDisk = this.getDiskDirs(diskName);
            if (targetDisk) {
                this.findDir(targetDisk.dirs, updatedItem, oldItemName);
            }
        },
        findDir(dirs, updatedItem, oldItemName) {
            for (let i = 0; i < dirs.length; i++) {
                const dir = dirs[i];
                if (dir.name === oldItemName) {
                    dirs[i] = updatedItem
                    return true;
                } else if (dir.subDir && dir.subDir.length) {
                    const foundFile = this.findDir(dir.subDir, updatedItem, oldItemName);
                    if (foundFile) {
                        if (dir.subDir.length === 0) {
                            dir.subDir = dirs[i] = updatedItem
                        }
                        return true;
                    }
                }
            }
            return false;
        }
    }
});