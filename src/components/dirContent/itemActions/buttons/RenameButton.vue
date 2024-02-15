<script>
import itemMixin from "@/components/mixins/itemMixin.js";

export default {
  name: "RenameButton",
  props: {
    items: {
      type: Array
    }
  },
  mixins: [itemMixin],
  data() {
    return {
      item: {},
    }
  },
  methods: {
    renameItem() {
      if (this.items.length > 1) {
        window.showAlert("warning", "Multiple item renaming is not supported")
      }
      if (this.items.length === 1) {
        this.item = this.items[0];
        this.oldItemName = this.items[0].name;
        this.$emitter.emit(
            "showRenameModal",
            {
              label: "Enter new file name:",
              functionOnSave: this.saveNewItemName,
              itemName: this.item.name
            }
        );
      }
    }
  }
}
</script>

<template>
  <button type="button" class="action-btn" @click="renameItem">
    <img src="@assets/pen.svg" alt="rename button" class="svg-img">
    <span class="action-btn__text item-action-btn__text">Rename</span>
  </button>
</template>