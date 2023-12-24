import {defineStore} from "pinia";
import {useSettingsStore} from "@/store/settingsStore.js";

export const useDisksDirsStore = defineStore("disksDirs", {
    state: () => ({
        data: []
    }),

    getters: {
        getDiskData: (state) => (diskName) => {
            return state.data.find(disk => disk.diskName === diskName);
        }
    },
    actions: {
        setDiskData(diskData) {
            this.data.push(diskData);
        }
    }
});