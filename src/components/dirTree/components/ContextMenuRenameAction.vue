<script>
import renameItemMixin from "@/components/mixins/renameItemMixin.js";

export default {
    name: "ContextMenuRenameAction",
    props: {
        item: {
            type: Object
        }
    },
    mixins: [renameItemMixin],
    methods: {
        showRenameModal() {
            this.oldItemName = this.item.name;
            this.$emitter.emit("closeRightContext");
            this.$emitter.emit(
                "showRenameModal",
                {
                    label: "New directory name:",
                    functionOnSave: this.saveNewItemName,
                    itemName: this.item.name
                }
            );
        }
    }
}
</script>

<template>
    <li id="rename-link" class="context-menu-item" @click="showRenameModal">
        <img alt="rename" class="svg-img" src="@assets/pen.svg">
        <span>Rename</span>
    </li>
</template>