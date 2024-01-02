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
  name: "App",
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

/*================== these styles define global CSS styling across the application border: 1px solid #3c4043;================*/
.selected {
  background-color: #F2F2F3 !important;
}

.rename-input {
  padding: 5px 12px;
  border: 1px solid #e8ebef;
  border-radius: 4px;
  outline-color: #7071E8;
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
  width: 15%;
  padding-right: 20px;
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

.delete-icon {
  color: #FE0000;
  cursor: pointer;
}

.error {
  color: #c40606;
  font-size: 14px;
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
</style>
