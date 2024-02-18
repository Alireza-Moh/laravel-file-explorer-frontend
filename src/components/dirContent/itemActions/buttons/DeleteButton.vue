<script>
import ConfirmModal from "@/components/modals/ConfirmModal.vue";
import {useCheckedItemsStore} from "@/stores/checkedItemsStore.js";
import {useDirItemsStore} from "@/stores/dirItemsStore.js";
import globalMixin from "@/components/mixins/globalMixin.js";
import deleteItemMixin from "@/components/mixins/deleteItemMixin.js";

export default {
    name: "DeleteButton",
    components: {ConfirmModal},
    mixins: [globalMixin, deleteItemMixin],
    props: {
        items: {
            type: Array
        }
    },
    data() {
        return {
            showConfirmModal: false,
            checkedItemsStore: useCheckedItemsStore(),
            dirItemsStore: useDirItemsStore()
        }
    },
    methods: {
        hideConfirmModal() {
            this.showConfirmModal = false;
            this.$emitter.emit("uncheckInput");
            this.checkedItemsStore.items = [];
        },
        async deleteItems() {
            const itemsToDelete = this.getFromData();
            this.diskName = this.items[0].diskName;
            this.dirName = this.items[0].dirName;

            if (itemsToDelete.files.length) {
                await this.deleteSelectedItems("file", itemsToDelete.files);
            }
            if (itemsToDelete.dirs.length) {
                await this.deleteSelectedItems("dir", itemsToDelete.dirs);
            }

            this.$emitter.emit("uncheckInput");
            this.checkedItemsStore.items = [];
        },
        getFromData() {
            let files = [];
            let dirs = [];

            this.items.forEach(item => {
                const itemToDelete = {
                    name: item.name,
                    path: item.path
                };
                if (item.type === 'file') {
                    files.push(itemToDelete);
                } else if (item.type === 'dir') {
                    dirs.push(itemToDelete);
                }
            });

            return {files, dirs};
        }
    }
}
</script>

<template>
    <button class="action-btn" type="button" @click="showConfirmModal = true">
        <img alt="" class="svg-img" src="@assets/trash3.svg">
        <span class="action-btn__text item-action-btn__text">Delete</span>
    </button>

    <ConfirmModal v-if="showConfirmModal"
                  :confirm-method-on-no="hideConfirmModal"
                  :confirm-method-on-yes="deleteItems">

        <template v-slot:confirmQuestion>
            You are about to delete "{{ items.length }}" items<br>
            Do you want to delete it?
        </template>
    </ConfirmModal>
</template>