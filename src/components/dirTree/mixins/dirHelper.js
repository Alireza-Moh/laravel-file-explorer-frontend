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
            const dirName = dir.label;
            const dirItems = dirItemsStore.getDirItems(settingsStore.defaultFileExplorerViewData.selectedDisk, dirName);

            if (dirItems) {
                this.updateSettingDefaultStore(settingsStore, dirName, dirItems.dirItems);
            }
            else {
                this.fetchDirItems($http, dir, settingsStore, dirItemsStore)
            }
        },
        fetchDirItems($http, dir, settingsStore, dirItemsStore) {
            const diskName = settingsStore.defaultFileExplorerViewData.selectedDisk;
            const dirName = dir.label;

            const url = settingsStore.baseUrl + "disks/" + diskName + "/dirs/" + dirName

            $http.get(url).then((data) => {
                const items = data.items;

                this.addsNewDirWithItemsToStore(dirItemsStore, diskName, dirName, items)
                this.updateSettingDefaultStore(settingsStore, dirName, items);
            })
        },
        addsNewDirWithItemsToStore(dirItemsStore, selectedDisk, selectedDir, items) {
            const dirItems = {
                diskName: selectedDisk,
                dirName: selectedDir,
                dirItems: items
            }
            dirItemsStore.setDirItems(dirItems);
        },
        updateSettingDefaultStore(settingsStore, selectedDir, items) {
            const defaultData = {
                ...settingsStore.defaultFileExplorerViewData,
                selectedDir: selectedDir,
                selectedDirItems: items,
            };
            settingsStore.setDefaultFileExplorerViewData(defaultData);
        }
    }
}