<script>
import {useSettingsStore} from "@/stores/settingsStore.js";
import {useDiskDirsStore} from "@/stores/diskDirsStore.js";
import ItemActionModal from "@/components/modals/RenameModal.vue";

export default {
  name: "RightClickContextMenu",
  components: {ItemActionModal},
  props: {
    left: {
      type: Number
    },
    top: {
      type: Number
    },
    dir:{
      type: Object
    },
    directoryIndex: {
      type: Object
    }
  },
  data() {
    return {
      settingsStore: useSettingsStore(),
      diskDirsStore: useDiskDirsStore(),
      errors: {}
    }
  },
  methods: {
    showRenameModal() {
      this.$emitter.emit("closeRightContext");
      this.$emitter.emit(
          "showRenameModal",
          {
            label: "New directory name:",
            functionOnSave: this.renameDir,
            errors: this.errors,
            itemName: this.dir.name
          }
      );
      this.showRenameModal = true;
    },
    deleteDir() {
      const url = this.settingsStore.baseUrl + "disks/" + this.dir.diskName + "/dirs/delete"
      const option = {
        body: JSON.stringify({
          items: [{
            name: this.dir.name,
            path: this.dir.path
          }]
        })
      };

      this.$http.delete(url, option).then((data) => {
        if (data.result) {
          const status = data.result.status;

          window.showAlert(status, data.result.message);
          this.removeDirFromDiskDirsStore(status)
        }
        if (data.errors) {
          this.$emitter.emit(
              "showErrorModal",
              {
                headline: "Delete Errors",
                errors: data.errors,
                showErrorKey: false
              }
          );
        }
      });
    },
    removeDirFromDiskDirsStore(status) {
      if (status === "success") {
        const targetDisk = this.diskDirsStore.getDiskDirs(this.dir.diskName);

        if (targetDisk && targetDisk.dirs) {
          this.findAndDeleteDirByName(targetDisk.dirs);
        }
      }
    },
    findAndDeleteDirByName(dirs) {
      for (let i = 0; i < dirs.length; i++) {
        const dir = dirs[i];
        if (dir.name === this.dir.name) {
          dirs.splice(i, 1);
          return true;
        } else if (dir.subDir && dir.subDir.length) {
          const foundFile = this.findAndDeleteDirByName(dir.subDir);
          if (foundFile) {
            if (dir.subDir.length === 0) {
              delete dir.subDir;
            }
            return true;
          }
        }
      }
      return false;
    },
    renameDir(newDirName) {
      const newPath = this.getNewDirNamePath(newDirName);
      const ulr = this.settingsStore.baseUrl
          + "disks/"
          + this.settingsStore.defaultFileExplorerViewData.selectedDisk
          + "/dirs/"
          + this.dir.name;
      const options = this.getRequestOption(newDirName, newPath);

      this.$http.put(ulr, options).then((data) => {
        if (data.result) {
          this.handleSuccessResponse(data, newDirName, newPath);
        }
        this.showErrors(data);
      });
    },
    getNewDirNamePath(newDirName) {
      const splitPath = this.dir.path.split('/');

      let newPath = newDirName;
      if (splitPath.length > 1) {
        newPath = this.dir.path.replace(this.dir.name, newDirName);
      }

      return newPath;
    },
    getRequestOption(newDirName, newPath) {
      return {
        body: JSON.stringify({
          oldName: this.dir.name,
          newName: newDirName,
          oldPath: this.dir.path,
          newPath: newPath
        })
      };
    },
    handleSuccessResponse(responseData, newDirName, newPath) {
      const status = responseData.result.status;

      window.showAlert(status, responseData.result.message);
      this.$emitter.emit("hideRenameModal");

      if (status === "success") {
        this.dir.name = newDirName;
        this.dir.path = newPath;
      }
    },
    showErrors(responseData) {
      if (responseData.errors) {
        this.$emitter.emit(
            "showErrorModal",
            {
              headline: "Rename Errors",
              errors: responseData.errors,
              showErrorKey: false
            }
        );
      }
    },
  }
}
</script>

<template>
  <div class="content" :style="{ top: top + 'px', left: left + 'px' }">
    <ul class="menu">
      <li class="item" @click="showRenameModal" id="rename-link">
        <img src="@assets/pen.svg" alt="rename" class="svg-img">
        <span>Rename</span>
      </li>
      <li class="item" @click="deleteDir" id="delete-link">
        <img src="@assets/trash3.svg" alt="" class="svg-img">
        <span>Delete</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.content {
  position: fixed;
  width: 200px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 12px 35px rgba(0,0,0,0.1);
  z-index: 9999;
}

.menu {
  padding: 10px 12px;
}

.item {
  list-style: none;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 7px 10px 7px 15px;
  margin-bottom: 10px;
  color: #000000;
}

.item:last-child {
  margin-bottom: 0;
}

.item:hover {
  background: #f2f2f2;
}

.item img {
  width: 14px;
  height: 14px;
}

.item span {
  margin-left: 8px;
  font-size: 12px;
}

body.dark-mode .content {
  background-color: #202124;
  box-shadow: 0 5px 10px rgba(0,0,0,0.2);
}

body.dark-mode .item {
  color: #f1f3f4;
}

body.dark-mode .item:hover {
  background-color: #303134;
}

</style>