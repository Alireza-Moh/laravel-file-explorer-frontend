import ItemActionModal from "@/components/_baseComponents/ItemActionModal.vue";
import storesMixin from "@/mixins/storesMixin.js";

export default {
    components: {ItemActionModal},
    mixins: [storesMixin],
    data() {
        return {
            showModal: false,
            diskName: null,
            dirName: null
        }
    },
    created() {
        this.diskName = this.settingsStore.defaultFileExplorerViewData.selectedDisk;
        this.dirName = this.settingsStore.defaultFileExplorerViewData.selectedDir;
    },
    mounted() {
        this.settingsStore.$subscribe((mutation, state) => {
            const defaultData = state.defaultFileExplorerViewData;
            this.dirName = defaultData.selectedDir;
            this.diskName = defaultData.selectedDisk;
        });
    },
    methods: {
        openModal() {
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        updateDirItems(items) {
            if (items.length > 0) {
                this.dirItemsStore.$patch((state) => {
                    const targetDirItems = state.data.find((dirItems) => {
                        return (dirItems.diskName === this.diskName) && (dirItems.dirName === this.dirName);
                    });
                    targetDirItems.dirItems = items;
                });
            }
        },
        createItem(url, path, type) {
            const options = {
                body: JSON.stringify({
                    path: path,
                    type: type
                })
            };

            this.$http.post(url, options).then((data) => {
                if (data.result) {
                    this.showModal = false;
                    window.showAlert(data.result.status, data.result.message);
                    this.updateDirItems(data.result.items);
                }
            });
        }
    }
}