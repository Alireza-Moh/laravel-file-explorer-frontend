<script>
import itemMixin from "@/components/mixins/itemMixin.js";

export default {
  name: "ContextMenuRenameAction",
  props: {
    item: {
      type: Object
    }
  },
  mixins: [itemMixin],
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
  <li class="context-menu-item" @click="showRenameModal" id="rename-link">
    <img src="@assets/pen.svg" alt="rename" class="svg-img">
    <span>Rename</span>
  </li>
</template>