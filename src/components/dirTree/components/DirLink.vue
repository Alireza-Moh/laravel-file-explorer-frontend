<script>
import storesMixin from "@/mixins/storesMixin.js";
import RightClickContextMenu from "@/components/dirTree/components/RightClickContextMenu.vue";
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
      const dirItems = this.dirItemsStore.getDirItems(
          this.settingsStore.defaultFileExplorerViewData.selectedDisk,
          dirName
      );

      if (dirItems) {
        this.updateSettingDefaultStore(dirItems.dirItems, dirItems.selectedDirPath);
      }
      else {
        this.fetchDirItems();
      }
    },
    fetchDirItems() {
      const diskName = this.settingsStore.defaultFileExplorerViewData.selectedDisk;
      const dirName = this.dir.label;

      const url = this.settingsStore.baseUrl + "disks/" + diskName + "/dirs/" + dirName

      const options = {
        body: JSON.stringify({
          path: this.dir.path
        })
      };

      this.$http.post(url, options).then((data) => {
        const items = data.items;

        this.addsNewDirWithItemsToStore(diskName, items, data.selectedDirPath)
        this.updateSettingDefaultStore(items, data.selectedDirPath);
      });
    },
    addsNewDirWithItemsToStore(selectedDisk, items, selectedDirPath) {
      this.dirItemsStore.addNewDirWithItems(
          selectedDisk,
          this.dir.label,
          selectedDirPath,
          items
      );
    },
    updateSettingDefaultStore(items, selectedDirPath) {
      const defaultData = this.settingsStore.defaultFileExplorerViewData;
      this.settingsStore.setDefaultFileExplorerViewData(
          defaultData.selectedDisk,
          this.dir.label,
          selectedDirPath,
          defaultData.dirsForSelectedDisk,
          items
      );
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
      <img v-if="showFolderIcon" src="../../../assets/img/folder-fill.svg" alt="folder icon"/>

      <RenameInput v-if="showRenameInput" :dir="dir" @hide-rename-input="hideRenameInput"/>
      <span v-else class="nav__name">{{ dir.label }}</span>

    </div>
    <img v-if="showCartIcon"
         src="../../../assets/img/chevron-right.svg"
         alt=""
         class="cheven_link svg-img"
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
  color: #000000;
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

body.dark-mode .nav__name {
  color: #f1f3f4;
}

.nav__link.selected {
  background-color: #F2F2F3 !important;
}

body.dark-mode .nav__link.selected {
  background-color: #515152 !important;
}
</style>