import {useSettingsStore} from "@/stores/settingsStore.js";
import {useCheckedItemsStore} from "@/stores/checkedItemsStore.js";
import {useDirItemsStore} from "@/stores/dirItemsStore.js";

export default {
    data() {
        return {
            settingsStore: useSettingsStore(),
            dirItemsStore: useDirItemsStore(),
            checkedItemsStore: useCheckedItemsStore()
        }
    },
    methods: {
        openDir(dir) {
            if (dir.type === "dir") {
                this.checkedItemsStore.uncheckItems();
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
                if (data.errors) {
                    this.$emitter.emit(
                        "showErrorModal",
                        {
                            headline: "Failed fetching directory data",
                            errors: data.errors,
                            showErrorKey: false
                        }
                    );
                }
                else {
                    const items = data.items;

                    this.addsNewDirWithItemsToStore(dir, diskName, items, data.selectedDirPath)
                    this.updateSettingDefaultStore(dir, items, data.selectedDirPath);
                }
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