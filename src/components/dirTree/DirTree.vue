<script>
import DirLink from "@/components/dirTree/DirLink.vue";
import dirHelper from "@/components/dirTree/mixins/dirHelper.js";
import DropDownDirLink from "@/components/dirTree/DropDownDirLink.vue";

export default {
  name: "DirTree",
  mixins: [dirHelper],
  components: {DropDownDirLink, DirLink},
  props: {
    dirs: Object
  },
  methods: {
    openSubNav() {
      this.isSubNavOpen = !this.isSubNavOpen;
    }
  }
}
</script>
<template>
  <template v-for="(dir, index) in dirs" :key="index">
    <DirLink v-if="!dir.subDir || (dir.subDir && dir.subDir.length === 0)" :dir="dir" :selected-dir="selectedDir"/>
    <div v-else class="nav__dropdown nav__link-with-dropdown nav__dropdown_nested" :class="{ selected: dir.label === selectedDir, 'opened-sub-dir': isSubNavOpen }">
      <DropDownDirLink :dir="dir" :selected-dir="selectedDir" @open-sub-nav="openSubNav"/>
      <div class="nav__dropdown-collapse">
        <DirTree v-if="dir.subDir" :dirs="dir.subDir" :selectedDir="selectedDir"/>
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
  background-color: #cdcddc;
  padding-left: 1em;
  padding-right: 10px;
  border-left: 1px solid #4d4dbf;
}

.nav__dropdown-collapse:first-child {
  border-left: none;
}

.opened-sub-dir {
  max-height: 100rem;
}
</style>