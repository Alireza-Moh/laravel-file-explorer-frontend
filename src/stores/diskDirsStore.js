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
        updateDirMetadataByName(diskName, metadata, oldItemName) {
            const targetDisk = this.getDiskDirs(diskName);
            if (targetDisk) {
                this.findDir(targetDisk.dirs, metadata, oldItemName);
            }
        },
        findDir(dirs, metadata, oldItemName) {
            for (let i = 0; i < dirs.length; i++) {
                const dir = dirs[i];
                if (dir.name === oldItemName) {
                    Object.assign(dir, metadata)
                    return true;
                } else if (dir.subDir && dir.subDir.length) {
                    const foundFile = this.findDir(dir.subDir, metadata, oldItemName);
                    if (foundFile) {
                        if (dir.subDir.length === 0) {
                            Object.assign(dir.subDir, metadata)
                        }
                        return true;
                    }
                }
            }
            return false;
        }
    }
});