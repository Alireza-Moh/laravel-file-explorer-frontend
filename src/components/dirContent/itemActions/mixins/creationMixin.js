import ItemActionModal from "@/components/modals/ItemActionModal.vue";
import storesMixin from "@/mixins/storesMixin.js";

export default {
    components: {ItemActionModal},
    mixins: [storesMixin],
    data() {
        return {
            showModal: false,
            diskName: null,
            dirName: null,
            selectedDirPath: null,
            errors: {}
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
        openModal() {
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.errors = {};
        },
        createItem(url, path, type, dirPath) {
            const options = {
                body: JSON.stringify({
                    path: path,
                    type: type,
                    dirPath: dirPath
                })
            };


            this.$http.post(url, options).then((data) => {
                if (data.errors) {
                    this.errors = data.errors;
                    return;
                }
                if (data.result) {
                    this.showModal = false;
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