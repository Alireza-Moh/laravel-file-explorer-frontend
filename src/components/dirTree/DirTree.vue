<script>
import DirLink from "@/components/dirTree/DirLink.vue";
import dirHelper from "@/components/dirTree/mixins/dirHelper.js";
import DropDownDirLink from "@/components/dirTree/DropDownDirLink.vue";
import storesMixin from "@/mixins/storesMixin.js";

export default {
  name: "DirTree",
  mixins: [dirHelper, storesMixin],
  components: {DropDownDirLink, DirLink},
  props: {
    dirs: Array
  },
  created() {
    this.selectedDir = this.settingsStore.defaultFileExplorerViewData.selectedDir;
  },
  methods: {
    openSubNav() {
      this.isSubNavOpen = !this.isSubNavOpen;
    }
  }
}
</script>
<template>
  <DirLink v-if="dirs && dirs.length === 0"
           :dir="{ label: 'No sub folder found', subDirs: []}"
           :show-folder-icon="false"
           :key="0"/>

  <template v-else v-for="dir in dirs">

    <DirLink v-if="!dir.subDir || (dir.subDir && dir.subDir.length === 0)"
             :dir="dir"
             :key="dir.label"/>

    <div v-else
         class="nav__dropdown nav__link-with-dropdown nav__dropdown_nested"
         :class="{ selected: isSelectedDir(dir.label), 'opened-sub-dir': isSubNavOpen }"
         :key="dir.label">

      <DropDownDirLink
          :dir="dir"
          @open-sub-nav="openSubNav"
          :key="dir.label"/>

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
  max-height: 35px;
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
</style>