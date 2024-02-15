<script>
import DirTree from "@/components/dirTree/components/DirTree.vue";
import DirLink from "@/components/dirTree/components/DirLink.vue";
import {useSettingsStore} from "@/stores/settingsStore.js";

export default {
  name: "TreeContainer",
  components: {DirLink, DirTree},
  data() {
    return {
      dirs: [],
      settingsStore: useSettingsStore(),
      hideTree: false
    }
  },
  created() {
    this.dirs = this.settingsStore.defaultFileExplorerViewData.dirsForSelectedDisk;
  },
  mounted() {
    this.settingsStore.$subscribe((mutation, state) => {
      this.dirs = state.defaultFileExplorerViewData.dirsForSelectedDisk;
    });

    this.$emitter.on("toggleTree", () => {
      this.hideTree = !this.hideTree;
    });
  }
}
</script>

<template>
  <div class="nav" :class="{hide: hideTree}" id="navbar">
    <div class="nav__items">
      <DirTree v-if="dirs.length"
               :dirs="dirs"/>

      <DirLink v-else
               :dir="{ name: 'No directories found', subDirs: []}"
               :key="0"/>
    </div>
  </div>
</template>

<style scoped>
.nav {
  width: 250px;
  position: fixed;
  height: 100%;
  padding-top: 2em;
  transition: all 0.3s linear;
}

.nav__items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav.hide {
  transform: translateX(-100%);
}
</style>