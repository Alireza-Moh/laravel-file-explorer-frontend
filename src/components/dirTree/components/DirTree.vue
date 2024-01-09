<script>
import DirLink from "@/components/dirTree/components/DirLink.vue";
import storesMixin from "@/mixins/storesMixin.js";

export default {
  name: "DirTree",
  mixins: [storesMixin],
  components: {DirLink},
  props: {
    dirs: Array
  },
  data() {
    return {
      isSubNavOpen: false,
      selectedDir: null,
      selectedSubNavToShow: null
    }
  },
  created() {
    this.selectedDir = this.settingsStore.defaultFileExplorerViewData.selectedDir;
  },
  mounted() {
    this.settingsStore.$subscribe((mutation, state) => {
      this.selectedDir = state.defaultFileExplorerViewData.selectedDir;
    });
  },
  methods: {
    openSubNav(label) {
      this.selectedSubNavToShow = label;
      this.isSubNavOpen = !this.isSubNavOpen;
    },
    isSelectedDir(dirName) {
      return dirName === this.selectedDir;
    },
  }
}
</script>

<template>
  <DirLink v-if="dirs && dirs.length === 0"
           :dir="{ label: 'No sub folder found', subDirs: []}"
           :key="0"/>

  <template v-else v-for="dir in dirs">
    <DirLink v-if="!dir.subDir || (dir.subDir && dir.subDir.length === 0)"
             :dir="dir"
             :key="dir.label"/>

    <div v-else
         class="nav__dropdown nav__link-with-dropdown nav__dropdown_nested"
         :class="{ selected: isSelectedDir(dir.label), 'opened-sub-dir': isSubNavOpen && selectedSubNavToShow === dir.label }"
         :key="dir.label">

      <DirLink :dir="dir"
               :key="dir.label"
               :show-cart-icon="true"
               @open-sub-nav="openSubNav"/>

      <div class="nav__dropdown-collapse">

        <DirTree v-if="dir.subDir"
                 :dirs="dir.subDir"
                 :key="dir.label"/>
      </div>
    </div>
  </template>
</template>

<style scoped>
.nav__dropdown {
  overflow: hidden;
  max-height: 33px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.nav__dropdown-collapse {
  background-color: #F2EAD3;
  padding-left: 1em;
  border-left: 1px solid #4d4dbf;
}

.nav__dropdown-collapse:first-child {
  border-left: none;
}

.opened-sub-dir {
  max-height: 100rem;
}

body.dark-mode .nav__dropdown-collapse {
  background-color: #303134;
}
</style>