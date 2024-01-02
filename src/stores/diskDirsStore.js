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
        }
    },
    actions: {
        addDiskDirs(diskData) {
            this.dirs.push(diskData);
        }
    }
});