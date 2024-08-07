import {defineStore} from "pinia";
import searchAndUpdate from "@/services/helpers.js";

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
        addDiskDirs(diskName, selectedDir, dirs) {
            const disk = {
                diskName: diskName,
                dirs: dirs,
                selectedDir: selectedDir
            }
            this.dirs.push(disk);
        },
        replaceDirsForDisk(diskName, dirs) {
            const targetDisk = this.dirs.find((disk) => {
                return (disk.diskName === diskName);
            });

            if (targetDisk && targetDisk.dirs) {
                targetDisk.dirs = dirs;
            }
        },
        updateDiskDirs(updatedItem, oldName) {
            const targetDisk = this.getDiskDirs(updatedItem.diskName);
            if (targetDisk) {
                searchAndUpdate(targetDisk.dirs, updatedItem, oldName);
            }
        },
    }
});