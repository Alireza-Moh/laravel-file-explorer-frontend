<script>
import storesMixin from "@/mixins/storesMixin.js";

export default {
  name: "SelectInputWithSearch",
  mixins: [storesMixin],
  data() {
    return {
      isActive: false,
      selectedFolder: null,
      searchKeyword: '',
      folders: []
    };
  },
  computed: {
    filteredFolders() {
      let displayedFolders = this.folders;

      if (this.searchKeyword) {
        displayedFolders = this.folders.filter(folder =>
            folder.label.includes(this.searchKeyword)
        );
      }

      return displayedFolders;
    }
  },
  created() {
   const folders = this.settingsStore.defaultFileExplorerViewData.allDirs;

   folders.forEach(folder => {
     if (folder.length > 0) {
       folder.forEach(subFolder => {
         this.folders.push(subFolder);
       });
     }
   })
  },
  methods: {
    toggleActive() {
      this.isActive = !this.isActive;
    },
    selectFolder(folder) {
      this.selectedFolder = folder;
      this.isActive = false;
      this.searchKeyword = '';

      this.$emit('update:modelValue', this.selectedFolder)
    },

  }
}
</script>

<template>
  <div class="container">
    <section class="select-menu" :class="{ active: isActive }">
      <div class="select-btn" @click="toggleActive">
        <span>{{ selectedFolder?.label || 'Select Folder' }}</span>
        <img src="../../assets/img/chevron-right.svg" alt="icon" class="cart">
      </div>
      <div class="select-content">
        <div class="sl-search">
          <input type="text" v-model="searchKeyword" 
                 placeholder="Search for folder"
                 spellcheck="false">
        </div>
        <div class="select-options">
          <ul>
            <li v-for="(folder, index) in filteredFolders"
                class="option"
                :class="{'selected': folder.label === selectedFolder?.label}"
                :key="index">
              <span @click="selectFolder(folder)">{{ folder.label }}</span>
              <span v-if="folder.label === selectedFolder?.label"
                    class="delete-icon"
                    @click="selectedFolder = null">X</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin-bottom: 1em;
}

.select-menu {
  margin: 0 auto;
  border: 1px solid #929fb1;
  border-radius: 4px;
}

.select-btn {
  background-color: white;
  padding: 10px;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
}

.select-btn .cart {
  transition: 0.3s;
}

.select-content {
  margin-top: 5px;
  padding: 20px;
  background-color: #fff;
  border-radius: 3px;
}

.sl-search {
  display: flex;
  align-items: baseline;
}

.sl-search input[type="text"] {
  width: 100%;
  padding: 10px;
  font-size: 15px;
  outline-color: #7071E8;
  border: 1px solid #e8ebef;
  border-radius: 3px;
}

ul {
  all: unset;
  list-style: none;
  margin-top: 10px;
  display: block;
  max-height: 250px;
  overflow-x: auto;
}

.option {
  border-bottom: 1px solid #e8ebef;
  cursor: pointer;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.3s;
}

.select-content {
  display: none;
}

.active .select-content {
  display: block;
}

.active .select-btn .cart {
  transform: rotate(90deg);
}

.option:hover {
  background-color: #F8F9FA;
}
</style>