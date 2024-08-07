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
            this.$API.fetchCsrfToken().then(responseToken => {
                const options = {
                    path: path,
                    destination: destination,
                    _token: responseToken.data.data.csrfToken
                };

                this.$API.post(url, options).then((response) => {
                    const result = response.data.result;
                    if (result) {
                        this.$emitter.emit("hideRenameModal");
                        window.showAlert(response.data.status, response.data.message);
                        this.updateStore(result);
                    }
                }).catch(error => {
                    const response = error.response;
                    this.showErrorModal(response.data);
                    window.showAlert(response.data.status, response.data.message);
                    if (response.status === 403) {
                        this.$emitter.emit("hideRenameModal");
                    }
                });
            })
        },
        updateStore(data) {
            this.dirItemsStore.replaceItemsInDir(data.items, this.diskName, this.dirName);
            this.diskDirsStore.replaceDirsForDisk(this.diskName, data.dirs);

            this.settingsStore.replaceDirsForSelectedDisk(this.diskName, this.dirName, data.dirs);
            this.settingsStore.replaceItemsForSelectedDir(this.diskName, this.dirName, data.items);
        }
    }
}