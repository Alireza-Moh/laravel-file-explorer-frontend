import {defineStore} from "pinia";

export const useDisksStore = defineStore("disks", {
    state: () => ({
        disks: []
    }),
    actions: {
        setDisks(disks) {
            this.disks = disks;
        }
    }
});