<script>
import videoTypes from "@/services/videoTypes.js";
import imageTypes from "@/services/imageTypes.js";
import ItemIcon from "@/components/dirContent/components/ItemIcon.vue";
import ItemPreviewCellWithRenameInput from "@/components/dirContent/components/ItemPreviewCellWithRenameInput.vue";
import ItemImageCell from "@/components/dirContent/components/ItemImageCell.vue";
import ItemVideoCell from "@/components/dirContent/components/ItemVideoCell.vue";
import dirMixin from "@/components/dirContent/mixins/dirMixin.js";

export default {
  name: "ContentTableRow",
  components: {ItemVideoCell, ItemImageCell, ItemPreviewCellWithRenameInput, ItemIcon},
  props: {
    item: {
      type: Object
    },
    showPreviewView: {
      type: Boolean,
      default: false
    }
  },
  mixins: [dirMixin],
  emits: ["showSelectedItemUrl"],
  data() {
    return {
      showRenameInput: false,
      isChecked: false,
      isImage: false,
      isVideo: false,
      videoType: "",
    }
  },
  created() {
    this.checkItemMediaType();
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
    showItem() {
      if (this.isImage) {
        this.$emitter.emit("showImageViewer", this.item.url);
      }
      else if (this.isVideo) {
        this.$emitter.emit("showVideoPlayer", this.item);
      }
    },
    checkItemMediaType() {
      this.isImage = false;
      this.isVideo = false;

      if (this.item.type !== "dir") {
        const extension = this.item.extension.toLowerCase();

        this.isImage = imageTypes.includes(extension);
        this.isVideo = videoTypes.includes(extension);

        if (this.isVideo) {
          this.videoType = "video/" + extension;
          this.item.videoType = this.videoType;
        }
      }
    },
  },
  watch: {
    isChecked(newValue) {
      if (newValue === false) {
        this.$emit('showSelectedItemUrl', null);
        this.checkedItemsStore.removeItemFromList(this.item);
      }
      if (newValue === true) {
        this.$emit('showSelectedItemUrl', this.item);
        this.checkedItemsStore.addItem(this.item);
      }
    },
    item: {
      handler() {
        this.checkItemMediaType();
      },
      deep: true
    }
  }
}
</script>

<template>
  <div class="item" @dblclick="openDir(item)">

    <div class="check-box-cell">
      <input type="checkbox"
             name="folder-item"
             class="folder-item-checkbox"
             aria-label="check box"
             v-model="isChecked">
    </div>

    <div class="name-cell">
      <ItemIcon :type="item.type"/>
      <template v-if="showPreviewView">
        <ItemImageCell v-if="isImage"
                       :item="item"
                       :show-rename-input="showRenameInput"/>

        <ItemVideoCell v-if="isVideo"
                       :item="item"
                       :show-rename-input="showRenameInput"
                       :video-type="videoType"/>

        <ItemPreviewCellWithRenameInput v-if="!isVideo && !isImage"
                                        :item="item"
                                        :show-rename-input="showRenameInput"/>
      </template>
      <ItemPreviewCellWithRenameInput v-else
                                      :item="item"
                                      :show-rename-input="showRenameInput"/>
    </div>

    <div class="date-cell">
      {{item.lastModified}}
    </div>

    <div class="size-cell">
      {{item.size}}
    </div>
    <div class="show-cell" @click="showItem">
      <img v-if="isImage"
           src="@assets/eye.svg"
           alt="show image">
      <img v-else-if="isVideo"
           src="@assets/play-circle.svg"
           alt="show video">
      <div v-else></div>
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

.folder-item-checkbox {
  accent-color: #7071E8;
}

@media screen and (max-width: 1000px) {
  .name-cell {
    font-size: 12px;
  }
}

@media screen and (max-width: 500px) {
  .size-cell {
    display: none;
  }
}

body.dark-mode .item {
  border-bottom: 1px solid #303134;
  color: #bdc1c6;
}

body.dark-mode .item:hover {
  background-color: #515152;
}
</style>

