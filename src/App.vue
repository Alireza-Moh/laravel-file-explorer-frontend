<script>
import TopMenu from "@/components/_baseComponents/TopMenu.vue";
import DiskList from "@/components/DiskList.vue";
import ItemActionList from "@/components/itemActions/ItemActionList.vue";
import DirTree from "@/components/dirTree/DirTree.vue";
import TreeContainer from "@/components/dirTree/TreeContainer.vue";
import DirContentTable from "@/components/dirTree/DirContentTable.vue";
import storesMixin from "@/mixins/storesMixin.js";
import Alert from "@/components/_baseComponents/Alert.vue";

export default {
  name: "App",
  mixins: [storesMixin],
  components: {
    Alert,
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
          this.storeDirItems(receivedData.selectedDirItems, receivedData.selectedDisk, receivedData.selectedDir);
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
      this.diskDirsStore.setDiskDirs(dirs);
    },
    storeDirItems(items, diskName, dirName) {
      const dirItems = {
        diskName: diskName,
        dirName: dirName,
        dirItems: items
      }
      this.dirItemsStore.setDirItems(dirItems);
    },
    storeDefaultFileExplorerViewData(receivedData) {
      const defaultData = {
        selectedDisk: receivedData.selectedDisk,
        selectedDir: receivedData.selectedDir,
        dirsForSelectedDisk: receivedData.dirsForSelectedDisk.dirs,
        selectedDirItems: receivedData.selectedDirItems,
      };

      this.settingsStore.setDefaultFileExplorerViewData(defaultData);
    }
  }
}
</script>

<template>
  <div class="main-wrapper">
    <Alert/>
    <TopMenu/>
    <main v-if="!isLoading">
      <TreeContainer/>
      <div class="content-box">
        <div class="nav-box">
          <DiskList/>
          <ItemActionList/>
        </div>
        <DirContentTable/>
      </div>
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
  height: 100vh;
}

.content-box {
  margin-left: 250px;
  border-left: 1px solid #e8ebef;
}

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
</style>
