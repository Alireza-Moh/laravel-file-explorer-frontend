<script>
import {useDiskDirsStore} from "@/stores/diskDirsStore.js";
import globalMixin from "@/components/mixins/globalMixin.js";
import deleteItemMixin from "@/components/mixins/deleteItemMixin.js";

export default {
    name: "ContextMenuDeleteAction",
    mixins: [globalMixin, deleteItemMixin],
    props: {
        dir: {
            type: Object
        }
    },
    data() {
        return {
            errors: {},
            diskDirsStore: useDiskDirsStore()
        }
    },
    methods: {
        deleteDir() {
            this.diskName = this.dir.diskName;
            this.dirName = this.dir.parent;
            this.itemsToDelete = [
                {
                    name: this.dir.name,
                    path: this.dir.path,
                    type: this.dir.type
                }
            ];

            this.deleteSelectedItems("dir");
        }
    }
}
</script>

<template>
    <li id="delete-link"
        class="context-menu-item"
        @click="deleteDir">
        <img alt="" class="svg-img" src="@assets/trash3.svg">
        <span>Delete</span>
    </li>
</template>