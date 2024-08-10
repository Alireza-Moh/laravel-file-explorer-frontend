<script>
import FileExplorer from "@/FileExplorer.vue";
import Button from "@/components/_baseComponents/Button.vue";
import {useSettingsStore} from "@/stores/settingsStore.js";
import {useSelectedItemsStore} from "@/stores/selectedtemsStore.js";

export default {
    name: "FileExplorerInModal",
    components: {Button, FileExplorer},
    props: {
        setting: {
            type: Object,
            required: true
        },
        modelValue: {
            type: Array
        }
    },
    data() {
        return {
            settingsStore: useSettingsStore(),
            selectedItemsStore: useSelectedItemsStore(),
            disabled: true,
            selectedItems: [],
            showModal: false
        }
    },
    created() {
        this.settingsStore.setDirContentTableViewportHeight('320px');
        this.settingsStore.setDirContentTableViewportBorder(true);
    },
    mounted() {
        this.selectedItemsStore.$subscribe((mutation, state) => {
            this.selectedItems = state.items;
            if (state.items.length) {
                this.disabled = false;
            }
            else {
                this.disabled = true;
            }
        });
    },
    methods: {
        select() {
            this.$emit('update:modelValue', this.selectedItems);
            this.showModal = false;
        },
        cancel() {
            this.selectedItemsStore.uncheckItems();
        }
    }
}
</script>

<template>
    <Button text="Open File Explorer"
            :on-click="() => showModal = true"/>

    <div v-if="showModal" class="modal-wrapper">
        <div class="modal" :class="{active: showModal}">
            <FileExplorer :setting="setting"/>
            <div class="btn-box">
                <Button text="Select"
                        :on-click="select"
                        :disabled="disabled"/>
                <Button text="Cancel"
                        type="cancel"
                        :on-click="cancel"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal {
    width: 1000px;
    position: absolute;
    top: 15%;
    left: 15%;
    transform: translate(-15%, -15%);
    transition: transform 0.4s ease-out, opacity 0.4s ease-out;
    opacity: 1;
}

.btn-box {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-top: 20px;
    gap: 20px;
}

#save-btn {
    margin-right: 0;
}

.modal.active {
    animation: slideUp 0.4s ease-out forwards;
}

@keyframes slideUp {
    from {
        transform: translateY(100%);
    }
    to {
        transform: translateY(0);
    }
}
</style>