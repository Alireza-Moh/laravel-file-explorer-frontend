<script>
export default {
  name: "ContentTableRow",
  props: {
    item: Object,
    showRowVariant: Boolean
  },
  emits: ["showSelectedItemUrl"],
  data() {
    return {
      showRenameInput: false,
      isChecked: false,
      isImage: false,
    }
  },
  created() {
    this.checkImage();
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
  methods: {
    checkImage() {
      if (this.item.type !== "dir") {
        const image = new Image();
        image.onload = () => { this.isImage = true; };
        image.onerror = () => { this.isImage = false; };
        image.src = this.item.url;
      }
    },
  },
  watch: {
    isChecked(newValue) {
      this.$emitter.emit("showItemActionList", this.item);
      this.$emit('showSelectedItemUrl', this.item)

      if (newValue === false) {
        this.$emit('showSelectedItemUrl', null)
        this.showRenameInput = false;
      }
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
      <template v-if="showRowVariant">
        <input v-if="showRenameInput"
               type="text"
               class="rename-input"
               v-model="item.name"
               autofocus>
        <span v-else>{{item.name}}</span>
      </template>

      <template v-else>
        <div v-if="isImage" class="thumbnail-box">
          <img :src="item.url" alt="img" class="thumbnail">
          <input v-if="showRenameInput"
              type="text"
              class="rename-input"
              v-model="item.name"
              autofocus>
          <span v-if="!showRenameInput">{{item.name}}</span>
        </div>

        <template v-else>
          <input v-if="showRenameInput"
                 type="text"
                 class="rename-input"
                 v-model="item.name"
                 autofocus>
          <span v-else>{{item.name}}</span>
        </template>
      </template>
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

.thumbnail-box {
  display: flex;
  align-items: center;
  gap: 10px;
}
.thumbnail {
  width: 100px;
}
</style>