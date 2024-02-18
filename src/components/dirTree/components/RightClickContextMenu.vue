<script>
import ContextMenuRenameAction from "@/components/dirTree/components/ContextMenuRenameAction.vue";
import ContextMenuDeleteAction from "@/components/dirTree/components/ContextMenuDeleteAction.vue";

export default {
    name: "RightClickContextMenu",
    components: {ContextMenuDeleteAction, ContextMenuRenameAction},
    props: {
        left: {
            type: Number
        },
        top: {
            type: Number
        },
        dir: {
            type: Object
        }
    }
}
</script>

<template>
    <div :style="{ top: top + 'px', left: left + 'px' }"
         class="context-menu-content">

        <ul class="context-menu-actions">
            <ContextMenuRenameAction :item="dir"/>
            <ContextMenuDeleteAction :dir="dir"/>
        </ul>

    </div>
</template>

<style>
.context-menu-content {
    position: fixed;
    width: 200px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.1);
    z-index: 9999;
}

.context-menu-actions {
    padding: 10px 12px;
}

.context-menu-item {
    list-style: none;
    width: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 4px;
    padding: 7px 10px 7px 15px;
    margin-bottom: 10px;
    color: #000000;
}

.context-menu-item:last-child {
    margin-bottom: 0;
}

.context-menu-item:hover {
    background: #f2f2f2;
}

.context-menu-item img {
    width: 14px;
    height: 14px;
}

.context-menu-item span {
    margin-left: 8px;
    font-size: 12px;
}

body.dark-mode .context-menu-content {
    background-color: #202124;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

body.dark-mode .context-menu-item {
    color: #f1f3f4;
}

body.dark-mode .context-menu-item:hover {
    background-color: #303134;
}

</style>