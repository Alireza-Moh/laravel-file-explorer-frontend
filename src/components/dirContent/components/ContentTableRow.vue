<script>
import videoTypes from "@/services/videoTypes.js";
import imageTypes from "@/services/imageTypes.js";
import ItemIcon from "@/components/dirContent/components/ItemIcon.vue";
import ItemRenameInput from "@/components/dirContent/components/ItemRenameInput.vue";
import ItemImageCell from "@/components/dirContent/components/ItemImageCell.vue";
import ItemVideoCell from "@/components/dirContent/components/ItemVideoCell.vue";
import ItemNormalCell from "@/components/dirContent/components/ItemNormalCell.vue";

export default {
  name: "ContentTableRow",
  components: {ItemNormalCell, ItemVideoCell, ItemImageCell, ItemRenameInput, ItemIcon},
  props: {
    item: Object,
    detector: Object
  },
  emits: ["showSelectedItemUrl"],
  data() {
    return {
      showRenameInput: false,
      isChecked: false,
      isImage: false,
      isVideo: false,
      videoType: "",
      showRowVariant: true
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

    this.$emitter.on("changeVariant", () => {
      this.showRowVariant = !this.showRowVariant;
    });
  },
  methods: {
    showImage() {
      if (this.isImage) {
        this.$emitter.emit("showImageViewer", this.item.url);
      }
      else if (this.isVideo) {
        this.$emitter.emit("showVideoPlayer", this.item);
      }
    },
    checkItemMediaType() {
      if (this.item.type !== "dir") {
        const extension = this.item.extension.toLowerCase();

        this.isImage = imageTypes.includes(extension);
        this.isVideo = videoTypes.includes(extension);
        if (this.isVideo) {
          this.videoType = "video/" + extension;
          this.item.videoType = this.videoType;
        }
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
  <div class="item" @dblclick="showImage">

    <div class="check-box-cell">
      <input type="checkbox"
             name="folder-item"
             class="folder-item-checkbox"
             v-model="isChecked" aria-label="check box">
    </div>

    <div class="name-cell">
      <ItemIcon :type="item.type"/>
      <ItemRenameInput v-if="showRowVariant" :item="item" :show-rename-input="showRenameInput"/>

      <template v-else>
        <ItemImageCell v-if="isImage" :item="item" :show-rename-input="showRenameInput"/>

        <ItemVideoCell v-if="isVideo" :item="item" :show-rename-input="showRenameInput" :video-type="videoType"/>

        <ItemRenameInput v-if="!isVideo && !isImage" :item="item" :show-rename-input="showRenameInput"/>
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

.folder-item-checkbox {
  accent-color: #7071E8;
}

@media screen and (max-width: 1000px) {
  .name-cell {
    font-size: 12px;
  }
}

body.dark-mode .item {
  border-bottom: 1px solid #303134;
  color: #bdc1c6;
}

body.dark-mode .item:hover {
  background-color: #303134;
}
</style>

