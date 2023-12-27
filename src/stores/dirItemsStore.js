import {defineStore} from "pinia";

export const useDirItemsStore = defineStore("dirItems", {
    state: () => ({
        data: []
    }),

    getters: {
        getDirItems: (state) => (diskName, dirName) => {
            return state.data.find(dirObject => dirObject.diskName === diskName && dirObject.dirName === dirName);
        }
    },
    actions: {
        setDirItems(dirData) {
            this.data.push(dirData);
        },
        removeItemFromDir(diskName, dirName) {

        }
    }
});