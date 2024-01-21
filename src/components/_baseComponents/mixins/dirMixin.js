import storesMixin from "@/mixins/storesMixin.js";

export default {
    mixins:[storesMixin],
    methods: {
        openDir(dir) {
            if (dir.type === "dir") {
                this.$emitter.emit("disablePreviewView");
                const dirItems = this.dirItemsStore.getDirItems(
                    this.settingsStore.defaultFileExplorerViewData.selectedDisk,
                    dir.name
                );

                if (dirItems) {
                    this.updateSettingDefaultStore(dir, dirItems.dirItems, dirItems.selectedDirPath);
                }
                else {
                    this.fetchDirItems(dir);
                }
            }
        },
        fetchDirItems(dir) {
            const diskName = this.settingsStore.defaultFileExplorerViewData.selectedDisk;
            const dirName = dir.name;

            const url = this.settingsStore.baseUrl + "disks/" + diskName + "/dirs/" + dirName

            const options = {
                body: JSON.stringify({
                    path: dir.path
                })
            };

            this.$http.post(url, options).then((data) => {
                const items = data.items;

                this.addsNewDirWithItemsToStore(dir, diskName, items, data.selectedDirPath)
                this.updateSettingDefaultStore(dir, items, data.selectedDirPath);
            });
        },
        addsNewDirWithItemsToStore(dir, selectedDisk, items, selectedDirPath) {
            this.dirItemsStore.addNewDirWithItems(
                selectedDisk,
                dir.name,
                selectedDirPath,
                items
            );
        },
        updateSettingDefaultStore(dir, items, selectedDirPath) {
            const defaultData = this.settingsStore.defaultFileExplorerViewData;
            this.settingsStore.setDefaultFileExplorerViewData(
                defaultData.selectedDisk,
                dir.name,
                selectedDirPath,
                defaultData.dirsForSelectedDisk,
                items
            );
        }
    }
}