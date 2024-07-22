import {useSettingsStore} from "@/stores/settingsStore.js";
import {useDirItemsStore} from "@/stores/dirItemsStore.js";
import {useDiskDirsStore} from "@/stores/diskDirsStore.js";
import globalMixin from "@/components/mixins/globalMixin.js";

export default {
    mixins: [globalMixin],
    data() {
        return {
            diskName: null,
            dirName: null,
            selectedDirPath: null,
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
                this.showErrorModal(data);
                if (data.result) {
                    const items = data.result.items;

                    this.$emitter.emit("hideRenameModal");
                    window.showAlert(data.status, data.message);
                    this.updateStore(items, data);
                }
            });
        },
        updateStore(items, data) {
            this.dirItemsStore.updateDir(items, this.diskName, this.dirName);
            this.diskDirsStore.replaceDirsForDisk(this.diskName, data.result.dirs);

            this.settingsStore.replaceDirsForSelectedDisk(this.diskName, this.dirName, data.result.dirs);
            this.settingsStore.replaceItemsForSelectedDir(this.diskName, this.dirName, items);
        }
    }
}