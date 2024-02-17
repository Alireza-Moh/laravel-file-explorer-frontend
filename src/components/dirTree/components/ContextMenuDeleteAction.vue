<script>
import {useDiskDirsStore} from "@/stores/diskDirsStore.js";
import {useSettingsStore} from "@/stores/settingsStore.js";
import globalMixin from "@/components/mixins/globalMixin.js";

export default {
  name: "ContextMenuDeleteAction",
  mixins: [globalMixin],
  props: {
    dir: {
      type: Object
    }
  },
  data() {
    return {
      errors: {},
      settingsStore: useSettingsStore(),
      diskDirsStore: useDiskDirsStore(),
    }
  },
  methods: {
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
        this.showErrorModal(data, "Delete Errors");
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
    }
  }
}
</script>

<template>
  <li class="context-menu-item" @click="deleteDir" id="delete-link">
    <img src="@assets/trash3.svg" alt="" class="svg-img">
    <span>Delete</span>
  </li>
</template>