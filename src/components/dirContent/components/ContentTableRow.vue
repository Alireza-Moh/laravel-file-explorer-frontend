<script>
import videoTypes from "@/services/videoTypes.js";
import imageTypes from "@/services/imageTypes.js";
import ItemIcon from "@/components/dirContent/components/ItemIcon.vue";
import ItemImageCell from "@/components/dirContent/components/ItemImageCell.vue";
import ItemVideoCell from "@/components/dirContent/components/ItemVideoCell.vue";
import dirMixin from "@/components/dirContent/mixins/dirMixin.js";
import PreviewView from "@/components/dirContent/components/PreviewView.vue";
import ItemName from "@/components/dirContent/components/ItemName.vue";

export default {
  name: "ContentTableRow",
  components: {ItemName, PreviewView, ItemVideoCell, ItemImageCell, ItemIcon},
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
  data() {
    return {
      showRenameInput: false,
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
      this.item.isChecked = false;
    });
  },
  methods: {
    showItem() {
      if (this.item.type === "dir") {
        this.openDir(this.item);
      }
      else if (this.isImage) {
        this.$emitter.emit("showImageViewer", this.item.url);
      }
      else if (this.isVideo) {
        this.$emitter.emit("showVideoPlayer", this.item);
      }
      else {
        this.$emitter.emit("showEditorViewer", this.item);
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
    onCheck() {
      if (this.item.isChecked) {
        this.checkedItemsStore.addItem(this.item);
      }
      else {
        this.checkedItemsStore.removeItemFromList(this.item);
      }
    }
  },
  watch: {
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
  <div class="item" @dblclick="showItem">
    <div class="name-cell name-cell-inter">
      <input type="checkbox"
             name="folder-item"
             class="folder-item-checkbox"
             aria-label="check box"
             v-model="item.isChecked" @change="onCheck">
      <ItemIcon :type="item.type"/>
      <PreviewView v-if="showPreviewView"
                   :item="item"
                   :is-image="isImage"
                   :is-video="isVideo"
                   :video-type="videoType"/>

      <ItemName  v-else
                 :item-name="item.name"/>
    </div>

    <div class="date-cell date-cell-inter">
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

.name-cell-inter {
  padding-left: 20px;
}

.item:hover {
  background-color: #F8F9FA;
}

.check-box-cell {
  padding-left: 20px;
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

