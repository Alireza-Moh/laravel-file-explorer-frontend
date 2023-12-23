<script>
import TopMenu from "@/components/_baseComponents/TopMenu.vue";
import DiskList from "@/components/DiskList.vue";
import ItemActionList from "@/components/_baseComponents/ItemActionList.vue";
import ExplorerMenu from "@/components/_baseComponents/ExplorerMenu.vue";
import DirTree from "@/components/dirTree/DirTree.vue";
import TreeContainer from "@/components/dirTree/TreeContainer.vue";

export default {
  name: "App",
  components: {
    TreeContainer,
    TopMenu,
    DiskList,
    ItemActionList,
    ExplorerMenu,
    DirTree
  },
  data() {
    return {
      disks: null,
      defaultDisk: null,
      dirs: null,
      selectedDir: null,
    }
  },
  created() {
    this.$store.setBaseUrl("http://laravel-wrapper.localhost:8084/api/laravel-file-explorer/");
    this.initExplorer();
  },
  methods: {
    initExplorer() {
      const endUrl = this.$store.baseUrl + "load-file-explorer";

      this.$http.get(endUrl, {}).then((data) => {
        if (data.initData) {
          this.disks = data.initData.disks;
          this.defaultDisk = data.initData.defaultDisk;
          this.dirs = data.initData.dirs;
          this.selectedDir = data.initData.selectedDir;
        }
      });
    }
  }
}
</script>

<template>
  <div class="main-wrapper">
    <TopMenu/>
    <main>
      <TreeContainer :dirs="dirs" :selected-dir="selectedDir"/>
      <div class="content-box">
        <div class="nav-box">
          <DiskList v-if="disks" :disks="disks" :default-disk="defaultDisk"/>
          <ItemActionList/>
          <ExplorerMenu/>
        </div>
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
  }

  .main-nav {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .content-box {
    margin-left: 250px;
    border-left: 1px solid #e8ebef;
  }

  .selected {
    background-color: #F2F2F3;
  }
</style>
