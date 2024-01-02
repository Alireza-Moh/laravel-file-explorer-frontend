<script>
import storesMixin from "@/mixins/storesMixin.js";

export default {
  name: "DiskList",
  mixins: [storesMixin],
  data() {
    return {
      selectedDisk: null,
      disks: []
    }
  },
  created() {
    this.selectedDisk = this.settingsStore.defaultFileExplorerViewData.selectedDisk;
    this.disks = this.disksStore.disks;
  },
  methods: {
    isSelectedDisk(diskName) {
      return diskName === this.selectedDisk;
    },
    getDiskDirs(diskName) {
      const diskDirs = this.diskDirsStore.getDiskDirs(diskName);
      if (diskDirs) {
        this.handleExistingDiskDirs(diskName, diskDirs);
      } else {
        this.fetchDiskDirs(diskName);
      }
    },
    handleExistingDiskDirs(diskName, diskDirs) {
      this.selectedDisk = diskName;
      const dirItems = this.dirItemsStore.getDirItems(diskName, diskDirs.selectedDir);
      this.updateExplorerViewData(diskName, diskDirs.selectedDir, diskDirs.selectedDirPath, diskDirs.dirs, dirItems.dirItems);
    },
    fetchDiskDirs(diskName) {
      this.$http.get(this.settingsStore.baseUrl + "disks/" + diskName)
          .then((data) => {
            this.updateDiskDirsStore(data, diskName);
            this.updateDirItemsStore(data, diskName);
            this.updateExplorerViewData(diskName, data.selectedDir, data.selectedDirPath, data.dirs, data.selectedDirItems);
            this.selectedDisk = diskName;
          });
    },
    updateDiskDirsStore(data, diskName) {
      const diskDirs = {
        selectedDir: data.selectedDir,
        diskName: diskName,
        dirs: data.dirs,
      };
      this.diskDirsStore.setDiskDirs(diskDirs);
    },
    updateDirItemsStore(data, diskName) {
      const dirItems = {
        diskName: diskName,
        dirName: data.selectedDir,
        dirItems: data.selectedDirItems,
        selectedDirPath: data.selectedDirPath
      };
      this.dirItemsStore.setDirItems(dirItems);
    },
    updateExplorerViewData(diskName, selectedDir, selectedDirPath, dirs, dirItems) {
      this.selectedDisk = diskName;
      this.changeDefaultFileExplorerViewData(diskName, selectedDir, selectedDirPath, dirs, dirItems);
    },
    changeDefaultFileExplorerViewData(diskName, selectedDir, selectedDirPath,  diskDirs, dirItems) {
      const defaultData = {
        selectedDisk: diskName,
        selectedDir: selectedDir,
        selectedDirPath: selectedDirPath,
        dirsForSelectedDisk: diskDirs,
        selectedDirItems: dirItems,
      };

      this.settingsStore.setDefaultFileExplorerViewData(defaultData);
    }
  }
}
</script>

<template>
  <div class="global-nav">
    <button class="action-btn"
            v-for="diskName in disks"
            :key="diskName"
            :class="{selected: isSelectedDisk(diskName)}"
            :disabled="isSelectedDisk(diskName)"
            @click="getDiskDirs(diskName)">
      <img src="../assets/img/hdd.svg" alt="hdd">
      <span class="action-btn__text">{{diskName}}</span>
    </button>
  </div>
</template>

<style>
.global-nav {
  padding: 15px;
  border-bottom: 1px solid #e8ebef;
  display: flex;
  align-items: center;
  gap: 10px;
}

.action-btn {
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s linear;
}

.action-btn:hover {
  background-color: #F2F2F3;
}
</style>