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
            errors: {}
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
            this.errors = {};
        },
        createItem(url, path, type) {
            const options = {
                body: JSON.stringify({
                    path: path,
                    type: type
                })
            };

            this.$http.post(url, options).then((data) => {
                if (data.errors) {
                    this.errors = data.errors;
                    return;
                }
                if (data.result) {
                    this.showModal = false;
                    window.showAlert(data.result.status, data.result.message);
                    this.dirItemsStore.updateDir(data.result.items, this.diskName, this.dirName);
                }
            });
        }
    }
}