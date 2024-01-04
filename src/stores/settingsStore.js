import {defineStore} from "pinia";

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
            const defaultData = {
                selectedDisk: diskName,
                selectedDir: dirName,
                selectedDirPath: dirPath,
                dirsForSelectedDisk: diskDirs,
                selectedDirItems: dirItems,
            };

            Object.keys(defaultData).forEach(key => {
                this.defaultFileExplorerViewData[key] = defaultData[key];
            });

        },
        replaceItemsForSelectedDir(diskName, dirName, items) {
            if (this.defaultFileExplorerViewData.selectedDisk === diskName  && this.defaultFileExplorerViewData.selectedDir === dirName) {
                this.defaultFileExplorerViewData.selectedDirItems = items;
            }
        },
        replaceDirsForSelectedDisk(diskName, dirName, dirs) {
            if (this.defaultFileExplorerViewData.selectedDisk === diskName  && this.defaultFileExplorerViewData.selectedDir === dirName) {
                this.defaultFileExplorerViewData.dirsForSelectedDisk = dirs;
            }
        }
    }
});