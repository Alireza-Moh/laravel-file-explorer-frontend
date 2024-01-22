<script>
import DirTree from "@/components/dirTree/components/DirTree.vue";
import storesMixin from "@/mixins/storesMixin.js";
import DirLink from "@/components/dirTree/components/DirLink.vue";

export default {
  name: "TreeContainer",
  components: {DirLink, DirTree},
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
  }
}
</script>

<template>
  <div class="nav" id="navbar">
    <div class="nav__items">
      <DirLink v-if="!dirs"
               :dir="{ name: 'No directories found', subDirs: []}"
               :key="0"/>
      <DirTree v-else :dirs="dirs"/>
    </div>
  </div>
</template>

<style scoped>
.nav {
  width: 250px;
  position: fixed;
  height: 100%;
  padding-top: 2em;
}

.nav__items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>