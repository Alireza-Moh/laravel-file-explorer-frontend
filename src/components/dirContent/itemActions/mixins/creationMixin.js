import {useSettingsStore} from "@/stores/settingsStore.js";
import {useDirItemsStore} from "@/stores/dirItemsStore.js";
import {useDiskDirsStore} from "@/stores/diskDirsStore.js";

export default {
    data() {
        return {
            diskName: null,
            dirName: null,
            selectedDirPath: null,
            errors: {},
            settingsStore: useSettingsStore(),
            dirItemsStore: useDirItemsStore(),
            diskDirsStore: useDiskDirsStore(),
        }
    },
    created() {
        this.diskName = this.settingsStore.defaultFileExplorerViewData.selectedDisk;
        this.dirName = this.settingsStore.defaultFileExplorerViewData.selectedDir;
        this.selectedDirPath = this.settingsStore.defaultFileExplorerViewData.selectedDirPath;
    },
    mounted() {
        this.settingsStore.$subscribe((mutation, state) => {
            const defaultData = state.defaultFileExplorerViewData;
            this.dirName = defaultData.selectedDir;
            this.diskName = defaultData.selectedDisk;
            this.selectedDirPath = defaultData.selectedDirPath;
        });
    },
    methods: {
        createItem(url, path, destination) {
            const options = {
                body: JSON.stringify({
                    path: path,
                    destination: destination
                })
            };

            this.$http.post(url, options).then((data) => {
                if (data.errors) {
                    this.$emitter.emit(
                        "showErrorModal",
                        {
                            headline: "Failed creating item",
                            errors: data.errors,
                            showErrorKey: false
                        }
                    );
                }
                if (data.result) {
                    this.$emitter.emit("hideRenameModal");
                    const items = data.result.items;

                    window.showAlert(data.result.status, data.result.message);

                    this.dirItemsStore.updateDir(items, this.diskName, this.dirName);
                    this.diskDirsStore.replaceDirsForDisk(this.diskName, data.result.dirs);

                    this.settingsStore.replaceDirsForSelectedDisk(this.diskName, this.dirName, data.result.dirs);
                    this.settingsStore.replaceItemsForSelectedDir(this.diskName, this.dirName, items);
                }
            });
        }
    }
}