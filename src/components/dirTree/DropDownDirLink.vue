<script>
import dirHelper from "@/components/dirTree/mixins/dirHelper.js";
import storesMixin from "@/mixins/storesMixin.js";

export default {
  name: "DropDownDirLink",
  mixins: [dirHelper, storesMixin],
  props: {
    dir: Object
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
      this.$emit("openSubNav")
    }
  }
}
</script>

<template>
  <div class="nav__link" :class="{ 'selected': isSelectedDir(dir.label) }">
    <div class="nav__link-wrapper" @click="getItems($http, dir, settingsStore, dirItemsStore)">
      <img src="../../assets/img/folder-fill.svg" alt="folder icon"/>
      <span class="nav__name">{{ dir.label }}</span>
    </div>
    <img src="../../assets/img/chevron-right.svg" alt="" class="cheven_link" :class="{ 'opened-sub-dir': isSubNavOpen}" @click="openSubNav"/>
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

.opened-sub-dir {
  transform: rotate(90deg);;
}
</style>