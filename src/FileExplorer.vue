<script>
import TopMenu from "@/components/_baseComponents/TopMenu.vue";
import DiskList from "@/components/DiskList.vue";
import ItemActionList from "@/components/dirContent/itemActions/ItemActionList.vue";
import DirTree from "@/components/dirTree/components/DirTree.vue";
import TreeContainer from "@/components/dirTree/TreeContainer.vue";
import DirContentTable from "@/components/dirContent/DirContentTable.vue";
import storesMixin from "@/mixins/storesMixin.js";
import Notify from "@/components/_baseComponents/Notify.vue";
import ImageViewer from "@/components/dirContent/components/ImageViewer.vue";
import VideoPlayerViewer from "@/components/dirContent/components/VideoPlayerViewer.vue";

export default {
  name: "FileExplorer",
  mixins: [storesMixin],
  components: {
    VideoPlayerViewer,
    ImageViewer,
    Notify,
    DirContentTable,
    TreeContainer,
    TopMenu,
    DiskList,
    ItemActionList,
    DirTree
  },
  data() {
    return {
      isLoading: true
    }
  },
  created() {
    this.settingsStore.setBaseUrl("http://laravel-wrapper.localhost:8084/api/laravel-file-explorer/");
    this.initExplorer();
  },
  methods: {
    initExplorer() {
      const endUrl = this.settingsStore.baseUrl + "load-file-explorer";

      this.$http.get(endUrl, {}).then((data) => {
        if (data.status === 200) {
          const receivedData = data.data;

          this.storeDisks(receivedData.disks);
          this.storeDirsForDisk(receivedData.dirsForSelectedDisk, receivedData.selectedDir);
          this.dirItemsStore.addNewDirWithItems(
              receivedData.selectedDisk,
              receivedData.selectedDir,
              receivedData.selectedDirPath,
              receivedData.selectedDirItems
          );
          this.storeDefaultFileExplorerViewData(receivedData)

          this.isLoading = false;
        }
      });
    },
    storeDisks(disks) {
      this.disksStore.setDisks(disks);
    },
    storeDirsForDisk(dirs, selectedDir) {
      dirs.selectedDir = selectedDir;
      this.diskDirsStore.addDiskDirs(dirs);
    },
    storeDefaultFileExplorerViewData(receivedData) {
      this.settingsStore.setDefaultFileExplorerViewData(
          receivedData.selectedDisk,
          receivedData.selectedDir,
          receivedData.selectedDirPath,
          receivedData.dirsForSelectedDisk.dirs,
          receivedData.selectedDirItems
      );
    }
  }
}
</script>

<template>
  <div class="main-wrapper">
    <Notify v-once/>
    <TopMenu v-once/>
    <main v-if="!isLoading">
      <TreeContainer/>
      <div class="content-box">
        <div class="nav-box">
          <DiskList/>
          <ItemActionList/>
        </div>
        <DirContentTable/>
      </div>
      <ImageViewer v-once/>
      <VideoPlayerViewer v-once/>
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  background-color: #fff;
}

.content-box {
  margin-left: 250px;
  border-left: 1px solid #e8ebef;
}

body.dark-mode {
  background-color: #202124;
}

body.dark-mode .content-box {
  border-left: 1px solid #303134;
}

body.dark-mode .rename-input {
  border: 1px solid #303134;
}

body.dark-mode .selected {
  background-color: #303134 !important;
}

body.dark-mode .rename-input {
  background-color: #303134;
  color: #f1f3f4;
}

/*================== these styles define global CSS styling across the application ================*/
.selected {
  background-color: #F2F2F3 !important;
}

.rename-input {
  padding: 5px 12px;
  border: 1px solid #e8ebef;
  border-radius: 4px;
  outline: none;
  width: 100%;
}

.check-box-cell {
  width: 3%;
  padding-left: 20px;
  display: flex;
  align-items: center;
}

.date-cell {
  width: 15%;
  text-align: left;
}

.size-cell {
  width: 12%;
  text-align: right;
}

.name-cell {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 68%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}

.show-cell {
  width: 3%;
  padding-right: 20px;
  cursor: pointer;
}

.delete-icon {
  color: #FE0000;
  cursor: pointer;
}

.error {
  color: #c40606;
  font-size: 14px;
}

.modal-wrapper {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}

.shimmer {
  overflow: hidden;
  position: relative;
}

.shimmer::before {
  content: "";
  position: absolute;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0) 100%);
  height: 100%;
  width: 100%;
  z-index: 1;
  animation: shimmer 1s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

</style>
