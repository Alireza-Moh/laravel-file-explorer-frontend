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
        }
    }
});