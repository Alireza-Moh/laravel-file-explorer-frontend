<script>
import storesMixin from "@/mixins/storesMixin.js";

export default {
  name: "RightClickContextMenu",
  mixins: [storesMixin],
  props: {
    left: Number,
    top: Number,
    dir: {},
    directoryIndex: {}
  },
  methods: {
    renameDir() {
      this.$emit("renameDir");
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
        } else if (dir.subDir && dir.subDir.length > 0) {
          const directoryIndex = this.findAndDeleteDirByName(dir.subDir);
          if (directoryIndex) {
            if (dir.subDir.length === 0) {
              delete dir.subDir;
            }
            return true;
          }
        }
      }
      return false;
    }
  }
}
</script>

<template>
  <div class="content" :style="{ top: top + 'px', left: left + 'px' }">
    <ul class="menu">
      <li class="item" @click="renameDir" id="rename-link">
        <img src="../../../assets/img/pen.svg" alt="rename" class="svg-img">
        <span>Rename</span>
      </li>
      <li class="item" @click="deleteDir" id="delete-link">
        <img src="../../../assets/img/trash3.svg" alt="" class="svg-img">
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