<script>
import ConfirmModal from "@/components/modals/ConfirmModal.vue";
import {useSelectedItemsStore} from "@/stores/selectedtemsStore.js";
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
            selectedItemsStore: useSelectedItemsStore(),
            dirItemsStore: useDirItemsStore()
        }
    },
    methods: {
        hideConfirmModal() {
            this.showConfirmModal = false;
            this.$emitter.emit("uncheckInput");
            this.selectedItemsStore.items = [];
        },
        deleteItems() {
            this.items.forEach(item => {
                this.itemsToDelete.push({
                    name: item.name,
                    path: item.path,
                    type: item.type
                });
            });
            this.diskName = this.items[0].diskName;
            this.dirName = this.items[0].parent;

            this.deleteSelectedItems();

            this.$emitter.emit("uncheckInput");
            this.selectedItemsStore.items = [];
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