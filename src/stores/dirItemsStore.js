import {defineStore} from "pinia";
import searchAndUpdate from "@/services/helpers.js";

export const useDirItemsStore = defineStore("dirItems", {
    state: () => ({
        data: []
    }),

    getters: {
        getDirItems: (state) => (diskName, parent) => {
            return state.data.find(dirObject => dirObject.diskName === diskName && dirObject.parent === parent);
        }
    },
    actions: {
        addNewDirWithItems(diskName, dirName, dirPath, items) {
            const dirWithItems = {
                diskName: diskName,
                parent: dirName,
                dirItems: items,
                selectedDirPath: dirPath
            };

            this.data.push(dirWithItems);
        },
        replaceItemsInDir(items, diskName, parent) {
            if (items.length) {
                const targetDir = this.data.find((dir) => {
                    return (dir.diskName === diskName) && (dir.parent === parent);
                });

                targetDir.dirItems = items;
            }
        },
        updateItem(updatedItem, oldName) {
            const targetDir = this.data.find((dir) => {
                return (dir.diskName === updatedItem.diskName) && (dir.parent === updatedItem.parent);
            });

            if (targetDir) {
                searchAndUpdate(targetDir.dirItems, updatedItem, oldName)
            }
        }
    }
});