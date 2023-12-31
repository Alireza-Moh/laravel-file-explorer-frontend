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
      isImage: false
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
    showImage() {
      if (this.isImage) {
        this.$emitter.emit("showImageViewer", this.item.url);
      }
    }
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
  <div class="item" @dblclick="showImage">

    <div class="check-box-cell">
      <input type="checkbox"
             name="folder-item"
             class="folder-item-checkbox"
             v-model="isChecked">
    </div>

    <div class="name-cell">
      <img v-if="item.type === 'dir'"
           src="../../../assets/img/folder-fill.svg"
           alt="folder icon"
           class="folder__icon">
      <img v-if="item.type === 'file'"
           src="../../../assets/img/file-earmark-fill.svg"
           alt="file icon"
           class="folder__icon">
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
          <div class="thumbnail-image-box">
            <img :src="item.url" alt="img" class="thumbnail">
          </div>
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
    </div>

    <div class="date-cell">
      {{item.lastModified}}
    </div>

    <div class="size-cell">
      {{item.size}}
    </div>
  </div>
</template>

<style scoped>
.item {
  height: 80px; /* must match itemHeight */
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid #e8ebef;
  font-size: 14px;
  text-align: right;
  transition: all 0.2s ease-in-out;
}

.item:hover {
  background-color: #F8F9FA;
}

.check-box-cell {
  width: 5%;
  padding-left: 20px;
  display: flex;
  align-items: center;
}

.date-cell {
  width: 20%;
  text-align: left;
}

.size-cell {
  width: 15%;
  padding-right: 20px;
  text-align: right;
}

.name-cell {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 60%;
  text-align: left;
}

.folder-item-checkbox {
  accent-color: #7071E8;
}

.thumbnail-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.thumbnail-image-box {
  width: 70px;
  height: 70px;
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

@media screen and (max-width: 1000px) {
  .name-cell {
    font-size: 12px;
  }
}
</style>

