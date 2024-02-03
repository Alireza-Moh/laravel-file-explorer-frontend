<script>
import {useSettingsStore} from "@/stores/settingsStore.js";

export default {
  name: "ContentTableMenu",
  emits: ["update:modelValue"],
  data() {
    return {
      currentDirPath: null,
      showPreviewView: false,
      settingsStore: useSettingsStore()
    }
  },
  created() {
    this.setCurrentPath(this.settingsStore.defaultFileExplorerViewData);
  },
  mounted() {
    this.settingsStore.$subscribe((mutation, state) => {
      this.setCurrentPath(state.defaultFileExplorerViewData);
    });

    this.$emitter.on("disablePreviewView", () => {
      this.showPreviewView = false;
    });
  },
  methods: {
    setCurrentPath(defaultFileExplorerViewData) {
      const selectedDisk = defaultFileExplorerViewData.selectedDisk
      this.currentDirPath = selectedDisk + "/" + defaultFileExplorerViewData.selectedDirPath;
    },
    changeContentVariant() {
      this.showPreviewView = !this.showPreviewView;
      this.$emitter.emit('showPreviewView');
    }
  }
}
</script>

<template>
  <div class="sub-nav">
    <div class="path-box">
      <div class="path">
        <img src="../../../assets/img/folder-check.svg" alt="" class="svg-img">
        <span v-if="currentDirPath">{{currentDirPath}}</span>
        <span v-else>Select checkbox to get path</span>
      </div>
    </div>
    <input type="search"
           name="itemSearch"
           id="itemSearch"
           placeholder="Type to search"
           @input="$emit('update:modelValue', $event.target.value)">
    <button class="action-btn"
            :class="{'selected': showPreviewView}"
            @click="changeContentVariant">
      <img src="../../../assets/img/list-ul.svg" alt="change list view" class="svg-img">
    </button>
  </div>
</template>

<style scoped>
.sub-nav {
  padding: 15px;
  border-bottom: 1px solid #e8ebef;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.path-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border: 1px solid #e8ebef;
  padding: 5px 12px;
  border-radius: 4px;
  flex-grow: 3;
}

.path {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: #000000;
}

#itemSearch {
  padding: 5px 12px;
  border: 1px solid #e8ebef;
  border-radius: 4px;
  outline: none;
  width: 300px;
  background-color: transparent;
  color: #000000;
}

body.dark-mode .path-box {
  border: 1px solid #303134;
}

body.dark-mode #itemSearch {
  border: none;
  background-color: #303134;
  color: #f1f3f4;
}

body.dark-mode .sub-nav {
  border-bottom: 1px solid #303134;
}

body.dark-mode .path {
  color: #f1f3f4;
}
</style>