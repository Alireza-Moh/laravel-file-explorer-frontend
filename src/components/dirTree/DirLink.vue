<script>
import storesMixin from "@/mixins/storesMixin.js";
import RightClickContextMenu from "@/components/_baseComponents/RightClickContextMenu.vue";
import RenameInput from "@/components/dirTree/components/RenameInput.vue";

export default {
  name: "DirLink",
  components: {RenameInput, RightClickContextMenu},
  mixins: [storesMixin],
  emits: ['openSubNav'],
  props: {
    dir: {
      type: Object,
      default: {}
    },
    showFolderIcon: {
      type: Boolean,
      default: true
    },
    showCartIcon: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showRightContext: false,
      left: 0,
      top: 0,
      showRenameInput: false,
      isSubNavOpen: false,
      selectedDir: null
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
    isSelectedDir(dirName) {
      return dirName === this.selectedDir;
    },
    openSubNav() {
      this.isSubNavOpen = !this.isSubNavOpen;
      this.$emit("openSubNav", this.dir.label);
    },
    showContextMenu(event) {
      event.preventDefault();

      this.left = event.clientX;
      this.top = event.clientY;

      this.showRightContext = true;
    },
    closeContextMenu() {
      this.showRightContext = false;
    },
    renameDir() {
      this.showRenameInput = true;
    },
    getItems() {
      const dirName = this.dir.label;
      const dirItems = this.dirItemsStore.getDirItems(this.settingsStore.defaultFileExplorerViewData.selectedDisk, dirName);

      if (dirItems) {
        this.updateSettingDefaultStore(dirItems.dirItems);
      }
      else {
        this.fetchDirItems();
      }
    },
    fetchDirItems() {
      const diskName = this.settingsStore.defaultFileExplorerViewData.selectedDisk;
      const dirName = this.dir.label;

      const url = this.settingsStore.baseUrl + "disks/" + diskName + "/dirs/" + dirName

      this.$http.get(url).then((data) => {
        const items = data.items;

        this.addsNewDirWithItemsToStore(diskName, items)
        this.updateSettingDefaultStore(items);
      });
    },
    addsNewDirWithItemsToStore(selectedDisk, items) {
      const dirItems = {
        diskName: selectedDisk,
        dirName: this.dir.label,
        dirItems: items
      }
      this.dirItemsStore.setDirItems(dirItems);
    },
    updateSettingDefaultStore(items) {
      const defaultData = {
        ...this.settingsStore.defaultFileExplorerViewData,
        selectedDir: this.dir.label,
        selectedDirItems: items,
      };
      this.settingsStore.setDefaultFileExplorerViewData(defaultData);
    },
    hideRenameInput(status, newDirName, newPath) {
      this.showRenameInput = false;
      if (status === "success") {
        this.dir.label = newDirName;
        this.dir.path = newPath;
      }
    }
  }
}
</script>

<template>
  <div class="nav__link"
       :class="{ 'selected': isSelectedDir(dir.label) }"
       @contextmenu="showContextMenu">

    <div class="nav__link-wrapper" @click="getItems">
      <img v-if="showFolderIcon" src="../../assets/img/folder-fill.svg" alt="folder icon"/>

      <RenameInput v-if="showRenameInput" :dir="dir" @hide-rename-input="hideRenameInput"/>
      <span v-else class="nav__name">{{ dir.label }}</span>

    </div>
    <img v-if="showCartIcon"
         src="../../assets/img/chevron-right.svg"
         alt=""
         class="cheven_link"
         :class="{ 'opened-sub-dir': isSubNavOpen}"
         @click="openSubNav"/>
  </div>

  <div v-if="showRightContext" class="context-overlay" @click="closeContextMenu">
    <RightClickContextMenu v-if="showRightContext" :left="left" :top="top" :dir="dir" @rename-dir="renameDir"/>
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

.context-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 999;
}

.opened-sub-dir {
  transform: rotate(90deg);;
}
</style>