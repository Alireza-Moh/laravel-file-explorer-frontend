<script>
import DirTree from "@/components/dirTree/components/DirTree.vue";
import storesMixin from "@/mixins/storesMixin.js";

export default {
  name: "TreeContainer",
  components: {DirTree},
  mixins: [storesMixin],
  data() {
    return {
      dirs: []
    }
  },
  created() {
    this.dirs = this.settingsStore.defaultFileExplorerViewData.dirsForSelectedDisk;
  },
  mounted() {
    this.settingsStore.$subscribe((mutation, state) => {
      this.dirs = state.defaultFileExplorerViewData.dirsForSelectedDisk;
    });

    this.diskDirsStore.$subscribe((mutation, state) => {
      const targetDisk = state.dirs.find((disk) => {
        return (disk.diskName === this.settingsStore.defaultFileExplorerViewData.selectedDisk);
      });

      if (targetDisk && targetDisk.dirs) {
        this.dirs = targetDisk.dirs;
      }
    });
  }
}
</script>

<template>
  <div class="nav" id="navbar">
    <div class="nav__items">
      <DirTree :dirs="dirs"/>
    </div>
  </div>
</template>

<style scoped>
.nav {
  width: 250px;
  position: fixed;
  height: 100%;
  padding-top: 2em;
  border-right: 1px solid #e8ebef;
}

.nav__items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>