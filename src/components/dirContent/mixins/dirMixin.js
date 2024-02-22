import {useSettingsStore} from "@/stores/settingsStore.js";
import {useSelectedItemsStore} from "@/stores/selectedtemsStore.js";
import {useDirItemsStore} from "@/stores/dirItemsStore.js";
import globalMixin from "@/components/mixins/globalMixin.js";

export default {
    mixins: [globalMixin],
    data() {
        return {
            settingsStore: useSettingsStore(),
            dirItemsStore: useDirItemsStore(),
            selectedItemsStore: useSelectedItemsStore()
        }
    },
    methods: {
        openDir(dir) {
            if (dir.type === "dir") {
                this.selectedItemsStore.uncheckItems();
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
                this.$emitter.emit("uncheckInput");
                this.selectedItemsStore.items = [];
            }
        },
        fetchDirItems(dir) {
            const diskName = this.settingsStore.defaultFileExplorerViewData.selectedDisk;
            const dirName = dir.name;

            const url = this.settingsStore.baseUrl
                + "disks/"
                + diskName
                + "/dirs/"
                + dirName
                + "?"
                + new URLSearchParams({
                    path: encodeURIComponent(dir.path)
                });

            this.$http.get(url).then((data) => {
                this.showErrorModal(data, "Failed fetching directory data");
                if (!data.errors) {
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