<script>
import {useSettingsStore} from "@/stores/settingsStore.js";
import {useSelectedItemsStore} from "@/stores/selectedtemsStore.js";
import globalMixin from "@/components/mixins/globalMixin.js";

export default {
    name: "DownloadButton",
    mixins: [globalMixin],
    props: {
        items: {
            type: Array
        }
    },
    data() {
        return {
            diskName: null,
            settingsStore: useSettingsStore(),
            selectedItemsStore: useSelectedItemsStore(),
        }
    },
    created() {
        this.diskName = this.settingsStore.defaultFileExplorerViewData.selectedDisk
    },
    methods: {
        download() {
            const url = this.settingsStore.baseUrl + "disks/" + this.diskName + "/items/download";
            const options = {
                body: JSON.stringify({
                    items: this.getFormData()
                })
            };

            this.$http.postBlob(url, options).then((blob) => {
                this.handleDownloadResponse(blob);

                this.$emitter.emit("uncheckInput");
                this.selectedItemsStore.items = [];
            });
        },
        handleDownloadResponse(blob) {
            if (blob.errors) {
                this.showErrorModal(blob, "Download Errors");
            }
            if (blob.result) {
                window.showAlert(blob.status, blob.message);
            }
            if (blob instanceof Blob) {
                this.createDownloadLink(blob);
            }
        },
        getFormData() {
            return this.items.map(item => ({
                name: item.name.replace("." + item.extension, ""),
                path: item.path,
                type: item.type
            }));
        },
        createDownloadLink(blob) {
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;

            link.setAttribute('download', this.getDownloadFileName());
            document.body.appendChild(link);
            link.click();
            link.remove();
        },
        getDownloadFileName() {
            return this.items.length === 1 ? this.items[0].name : this.diskName + "_items";
        }
    }
}
</script>

<template>
    <button class="action-btn" type="button" @click="download">
        <img alt="download icon" class="svg-img" src="@assets/download.svg">
        <span class="action-btn__text item-action-btn__text">Download</span>
    </button>
</template>