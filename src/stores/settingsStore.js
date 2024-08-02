import {defineStore} from "pinia";
import searchAndUpdate from "@/services/helpers.js";

export const useSettingsStore = defineStore("settings", {
    state: () => ({
        baseUrl: "",
        defaultFileExplorerViewData: {}
    }),
    actions: {
        setBaseUrl(baseUrl) {
            this.baseUrl = baseUrl;
        },
        setDefaultFileExplorerViewData(diskName, dirName, dirPath, diskDirs, dirItems) {
            this.defaultFileExplorerViewData = {
                selectedDisk: diskName,
                selectedDir: dirName,
                selectedDirPath: dirPath,
                dirsForSelectedDisk: diskDirs,
                selectedDirItems: dirItems,
            };
        },
        replaceItemsForSelectedDir(diskName, dirName, items) {
            if (this.isCorrectDisk(diskName, dirName)) {
                this.defaultFileExplorerViewData.selectedDirItems = items;
            }
        },
        replaceDirsForSelectedDisk(diskName, dirName, dirs) {
            if (this.isCorrectDisk(diskName, dirName)) {
                this.defaultFileExplorerViewData.dirsForSelectedDisk = dirs;
            }
        },
        updateItemForSelectedDir(updatedItem, oldName) {
            if (this.isCorrectDisk(updatedItem.diskName, updatedItem.parent)) {
                searchAndUpdate(this.defaultFileExplorerViewData.selectedDirItems, updatedItem, oldName);
            }
        },
        updateDirForSelectedDisk(updatedItem, oldName) {
            if (this.isCorrectDisk(updatedItem.diskName, updatedItem.parent)) {
                searchAndUpdate(this.defaultFileExplorerViewData.dirsForSelectedDisk, updatedItem, oldName);
            }
        },
        isCorrectDisk(diskName, parent) {
            return this.defaultFileExplorerViewData.selectedDisk === diskName
                && this.defaultFileExplorerViewData.selectedDir === parent;
        }
    }
});