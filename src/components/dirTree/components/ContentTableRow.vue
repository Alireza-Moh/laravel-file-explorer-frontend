<script>
export default {
  name: "ContentTableRow",
  props: {
    item: Object
  },
  data() {
    return {
      showRenameInput: false,
      isChecked: false
    }
  },
  mounted() {
    this.$emitter.on("uncheckInput", () => {
      this.isChecked = false;
    });

    this.$emitter.on("showRenameInputForItem", (itemName) => {
      if (this.item.name === itemName) {
        this.showRenameInput = true;
      }
    });

    this.$emitter.on("hideRenameInput", () => {
      this.showRenameInput = false;
    });
  },
  watch: {
    isChecked() {
      this.$emitter.emit("showItemActionList", this.item);
    }
  }
}
</script>

<template>
  <tr>
    <td>
      <input type="checkbox" name="folder-item" class="folder-item-checkbox" v-model="isChecked">
    </td>
    <td>
      <img v-if="item.type === 'dir'"
           src="../../../assets/img/folder-fill.svg"
           alt="folder icon"
           class="folder__icon">
      <img v-if="item.type === 'file'"
           src="../../../assets/img/file-earmark-fill.svg"
           alt="file icon"
           class="folder__icon">
    </td>
    <td class="folder-item-name">
      <input v-if="showRenameInput"
             type="text"
             class="rename-input"
             v-model="item.name"
             autofocus>
      <span v-else>{{item.name}}</span>
    </td>
    <td>
      {{item.lastModified}}
    </td>
    <td class="td-size">
      {{item.size}}
    </td>
  </tr>
</template>

<style scoped>
tr {
  transition: all 0.3s linear;
}

tr:hover {
  background-color: #F8F9FA;
}

td, th {
  padding: 15px 20px;
}

td {
  font-size: 14px;
}

th {
  font-size: 14px;
  font-weight: bold;
}

tr {
  border-bottom: 1px solid #e8ebef;
}

.td-size {
  text-align: right;
}

.folder-item-checkbox {
  accent-color: #7071E8;
}
</style>