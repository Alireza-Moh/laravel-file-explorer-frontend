<script>
import dirHelper from "@/components/dirTree/mixins/dirHelper.js";
import storesMixin from "@/mixins/storesMixin.js";

export default {
  name: "DirLink",
  mixins: [dirHelper, storesMixin],
  props: {
    dir: {
      type: Object,
      default: {}
    },
    showFolderIcon: {
      type: Boolean,
      default: true
    }
  },
  created() {
    this.selectedDir = this.settingsStore.defaultFileExplorerViewData.selectedDir;
  },
  mounted() {
    this.settingsStore.$subscribe((mutation, state) => {
      this.selectedDir = state.defaultFileExplorerViewData.selectedDir;
    })
  },
  methods: {
    openSubNav() {
      this.isSubNavOpen = !this.isSubNavOpen;
    }
  }
}
</script>

<template>
  <div class="nav__link" :class="{ 'selected': isSelectedDir(dir.label) }" @click="getItems($http, dir, settingsStore, dirItemsStore)">
    <div class="nav__link-wrapper">
      <img v-if="showFolderIcon" src="../../assets/img/folder-fill.svg" alt="folder icon"/>
      <span class="nav__name">{{ dir.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.nav__link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px 10px 0.8em;
  cursor: pointer;
  transition: all 0.3s linear;
}

.nav__link-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav__name {
  font-size: .75rem;
  font-weight: 500;
  white-space: nowrap;
}

.nav__link:hover {
  color: #7071E8;
}
</style>