<!--
<script>
import storesMixin from "@/mixins/storesMixin.js";
import ConfirmModal from "@/components/_baseComponents/ConfirmModal.vue";

export default {
  name: "ItemActionList",
  components: {ConfirmModal},
  mixins: [storesMixin],
  data() {
    return {
      showItemActions: false,
      item: null,
      oldFileName: null,
      showConfirmModal: false
    }
  },
  mounted() {
    this.$emitter.on("showItemActionList", (item) => {
      this.item = item;
      this.oldFileName = item.name
      this.showItemActions = !this.showItemActions;
    });
  },
  methods: {
    renameItem() {
      this.$emitter.emit("showRenameInputForItem", this.item.name);
    },
    saveNewFileName() {
      const splitPath = this.item.path.split('/');

      let newPath = this.oldFileName;
      if (splitPath.length > 1) {
        newPath = this.item.path.replace(this.oldFileName, this.item.name);
      }

      const url = this.settingsStore.baseUrl + "disks/" + this.item.diskName + "/dirs/" + this.getFileNameWithoutExtension();
      const options = {
        body: JSON.stringify({
          oldPath: this.item.path,
          newPath: newPath
        })
      };

      this.$http.put(url, options).then((data) => {
        if (data.result) {
          const status = data.result.status;

          if (status === "success") {
            this.item.path = newPath;
          }
          else if (status === "failed") {
            this.item.name = this.oldFileName;
          }

          window.showAlert(status, data.result.message);
          this.$emitter.emit("hideRenameInput");
        }
      });
    },
    getFileNameWithoutExtension() {
      const fileName = this.oldFileName;
      const lastDotIndex = fileName.lastIndexOf('.');

      if (lastDotIndex === -1) {
        return fileName;
      } else {
        return fileName.substring(0, lastDotIndex);
      }
    },
    deleteItem() {
      this.showConfirmModal = false;
      const options = {
        body: JSON.stringify({
          path: this.item.path,
        })
      };
      this.$http.delete(this.getUrl(), options).then((data) => {
        this.$emitter.emit("uncheckInput");
        if (data.result) {
          const status = data.result.status;

          window.showAlert(status, data.result.message);
          this.removeItemFromDirStore(status)
        }
      });
    },
    removeItemFromDirStore(status) {
      if (status === "success") {
        this.dirItemsStore.$patch((state) => {
          const targetDirItems = state.data.find((dirItems) => {
            return (dirItems.diskName === this.item.diskName) && (dirItems.dirName === this.item.dirName);
          });
          targetDirItems.dirItems = targetDirItems.dirItems.filter(item => item.name !== this.item.name);
        });
      }
    },
    getUrl() {
      if (this.item.type === "file") {
        return this.settingsStore.baseUrl
            + "disks/"
            + this.item.diskName
            + "/files/"
            + this.getFileNameWithoutExtension();
      }
      else if (this.item.type === "dir") {
        return this.settingsStore.baseUrl
            + "disks/"
            + this.item.diskName
            + "/dirs/"
            + this.getFileNameWithoutExtension();
      }
    },
    confirmDelete() {
      this.showConfirmModal = true;
    },
    hideConfirmModal() {
      this.showConfirmModal = false;
    },
  }
}
</script>

<template>
  <div class="global-nav">
    <button type="button" class="action-btn" id="addFileBtn">
      <img src="../../assets/img/file-earmark-plus.svg" alt="">
      <span class="action-btn__text">Create file</span>
    </button>
    <button type="button" class="action-btn" id="addFodlerBtn">
      <img src="../../assets/img/folder-plus.svg" alt="">
      <span class="action-btn__text">Add folder</span>
    </button>
    <div v-if="showItemActions" class="related-item-action-wrapper">
      <button type="button" class="action-btn">
        <img src="../../assets/img/copy.svg" alt="">
        <span class="action-btn__text">Copy</span>
      </button>
      <button type="button" class="action-btn">
        <img src="../../assets/img/download.svg" alt="">
        <span class="action-btn__text">Download</span>
      </button>
      <button type="button" class="action-btn" @click="renameItem">
        <img src="../../assets/img/pen.svg" alt="">
        <span class="action-btn__text">Rename</span>
      </button>
      <button type="button" class="action-btn" @click="confirmDelete">
        <img src="../../assets/img/trash3.svg" alt="">
        <span class="action-btn__text">Delete</span>
      </button>
      <button type="button" class="action-btn" @click="saveNewFileName">
        <img src="../../assets/img/floppy.svg" alt="">
        <span class="action-btn__text">Save</span>
      </button>
    </div>
  </div>
  <ConfirmModal v-if="showConfirmModal"
                :confirm-method-on-yes="deleteItem"
                :confirm-method-on-no="hideConfirmModal">

    <template v-slot:confirmQuestion>
      You are about to delete "{{item.name}}"<br> Do you want to delete it?
    </template>
  </ConfirmModal>
</template>

<style scoped>
.related-item-action-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>-->


<script>
import storesMixin from "@/mixins/storesMixin.js";
import ConfirmModal from "@/components/_baseComponents/ConfirmModal.vue";
import RenameButton from "@/components/_baseComponents/itemActions/buttons/RenameButton.vue";
import SaveButton from "@/components/_baseComponents/itemActions/buttons/SaveButton.vue";
import DeleteButton from "@/components/_baseComponents/itemActions/buttons/DeleteButton.vue";
import DownloadButton from "@/components/_baseComponents/itemActions/buttons/DownloadButton.vue";
import CopyButton from "@/components/_baseComponents/itemActions/buttons/CopyButton.vue";

export default {
  name: "ItemActionList",
  components: {CopyButton, DownloadButton, DeleteButton, SaveButton, RenameButton, ConfirmModal},
  mixins: [storesMixin],
  data() {
    return {
      showItemActions: false,
      item: null
    }
  },
  mounted() {
    this.$emitter.on("showItemActionList", (item) => {
      this.item = item;
      this.showItemActions = !this.showItemActions;
    });
  },
  methods: {

  }
}
</script>

<template>
  <div class="global-nav">
    <button type="button" class="action-btn" id="addFileBtn">
      <img src="../../assets/img/file-earmark-plus.svg" alt="">
      <span class="action-btn__text">Create file</span>
    </button>
    <button type="button" class="action-btn" id="addFodlerBtn">
      <img src="../../assets/img/folder-plus.svg" alt="">
      <span class="action-btn__text">Add folder</span>
    </button>
    <div v-if="showItemActions" class="related-item-action-wrapper">
      <CopyButton :item="item"/>
      <DownloadButton :item="item"/>
      <DeleteButton :item="item"/>
      <RenameButton :item="item"/>
      <SaveButton :item="item"/>
    </div>
  </div>
</template>

<style scoped>
.related-item-action-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>