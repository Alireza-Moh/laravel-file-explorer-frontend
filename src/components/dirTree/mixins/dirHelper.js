export default {
    data() {
        return {
            isSubNavOpen: false,
            selectedDir: null
        }
    },
    methods: {
        isSelectedDir(dirName) {
            return dirName === this.selectedDir;
        },
        getItems($http, dir, settingsStore, dirItemsStore) {
            const defaultExistingData = settingsStore.defaultFileExplorerViewData;
            const dirName = dir.label;
            const dirItems = dirItemsStore.getDirItems(defaultExistingData.selectedDisk, dirName);

            if (dirItems) {
                const defaultData = {
                    ...defaultExistingData,
                    selectedDir: dirName,
                    selectedDirItems: dirItems.dirItems,
                };

                settingsStore.setDefaultFileExplorerViewData(defaultData);
            }
            else {
                $http.get(settingsStore.baseUrl + "disks/" + defaultExistingData.selectedDisk + "/dirs/" + dirName).then((data) => {
                    const dirItems = {
                        diskName: defaultExistingData.selectedDisk,
                        dirName: dirName,
                        dirItems: data.items
                    }
                    dirItemsStore.setDirItems(dirItems);


                    const defaultData = {
                        ...settingsStore.defaultFileExplorerViewData,
                        selectedDir: dirName,
                        selectedDirItems: data.items,
                    };
                    settingsStore.setDefaultFileExplorerViewData(defaultData);
                })
            }
        }
    }
}