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
        addNewDirWithItems(diskName, dirName, dirPath, items) {
            const dirWithItems = {
                diskName: diskName,
                dirName: dirName,
                dirItems: items,
                selectedDirPath: dirPath
            };

            this.data.push(dirWithItems);
        },
        updateDir(items, diskName, dirName) {
            if (items.length) {
                const targetDir = this.data.find((dir) => {
                    return (dir.diskName === diskName) && (dir.dirName === dirName);
                });
                targetDir.dirItems = items;
            }
        },
    }
});