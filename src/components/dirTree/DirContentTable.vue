<script>
import storesMixin from "@/mixins/storesMixin.js";
import ContentTableRow from "@/components/dirTree/components/ContentTableRow.vue";
import ContentTableMenu from "@/components/_baseComponents/ContentTableMenu.vue";

export default {
  name: "DirContentTable",
  components: {ContentTableRow, ContentTableMenu},
  mixins: [storesMixin],
  data() {
    return {
      showRowVariant: true,
      selectedDir: null,
      selectedDisk: null,
      selectedItem: null,
      searchedItem: null,
      items: [],
      visibleItems: [],
      itemHeight: 80,
      scrollTop: 0,
    };
  },
  computed: {
    fullHeight() {
      return this.items.length * this.itemHeight;
    },

    filteredItems() {
      let displayedItems = this.visibleItems;
      if (this.searchedItem) {
        const searchTerm = this.searchedItem.trim().toLowerCase();
        displayedItems = this.items.filter(item => {
          return item.name.toLowerCase().includes(searchTerm);
        });
      }

      return displayedItems;
    }
  },
  created() {
    const defaultData = this.settingsStore.defaultFileExplorerViewData;

    this.items = defaultData.selectedDirItems;
    this.selectedDir = defaultData.selectedDir;
    this.selectedDisk = defaultData.selectedDisk;
  },
  mounted() {
    this.updateVisibleItems();

    this.settingsStore.$subscribe((mutation, state) => {
      const defaultData = state.defaultFileExplorerViewData;

      this.items = defaultData.selectedDirItems;
      this.selectedDir = defaultData.selectedDir;
      this.selectedDisk = defaultData.selectedDisk;
    });

    this.dirItemsStore.$subscribe((mutation, state) => {
      const dir = state.data.find((dir) => (dir.diskName === this.selectedDisk) && (dir.dirName === this.selectedDir));
      if (dir && dir.dirItems) {
        this.items = dir.dirItems;
      }
    });
  },
  methods: {
    setSelectedItem(item) {
      this.selectedItem = item;
    },
    setVariant() {
      this.showRowVariant = !this.showRowVariant;
    },
    onScroll() {
      this.scrollTop = this.$refs.viewport.scrollTop;
      this.updateVisibleItems();
    },
    updateVisibleItems() {
      const viewportHeight = this.$refs.viewport.clientHeight;
      const visibleCount = Math.ceil(viewportHeight / this.itemHeight); //determine the number of items that can be rendered in the table based on the available space
      const startIdx = Math.floor(this.scrollTop / this.itemHeight); //retrieve the next item to be rendered in the table
      const endIdx = startIdx + visibleCount * 2; //to improve scrolling experience, retrieve twice the number of items
      this.visibleItems = this.items.slice(startIdx, endIdx);
    },
  }
};
</script>

<template>
  <ContentTableMenu :item="selectedItem" v-model="searchedItem" @change-variant="setVariant"/>
  <div class="content-header">
    <div class="headline check-box-cell"></div>
    <div class="headline name-cell">Name</div>
    <div class="headline date-cell">Modified</div>
    <div class="headline size-cell">Size</div>
  </div>
  <div ref="viewport" class="viewport" @scroll="onScroll">

    <div class="full-container" :style="{ height: fullHeight + 'px' }">

      <div class="visible-container" :style="{ transform: 'translateY(' + scrollTop + 'px)' }">
        <template v-if="filteredItems.length > 0" >
          <ContentTableRow v-for="(item, index) in filteredItems"
                           :key="index"
                           :item="item"
                           :show-row-variant="showRowVariant"
                           @show-selected-item-url="setSelectedItem"/>

        </template>
        <div v-else class="item">
          <div>
            No data found
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.viewport {
  height: 620px;
  overflow-y: auto;
}

.full-container {
  position: relative;
  width: 100%;
}

.visible-container {
  position: absolute;
  top: 0;
  width: 100%;
}

.content-header {
  background-color: #F8F9FA;
  justify-content: space-between;
  display: flex;
  align-items: center;
  padding: 15px 20px;
  font-size: 14px;
  font-weight: bold;
}

.check-box-cell {
  width: 5%;
  padding-left: 20px;
  display: flex;
  align-items: center;
}

.date-cell {
  width: 20%;
  text-align: left;
}

.size-cell {
  width: 15%;
  padding-right: 20px;
  text-align: right;
}

.name-cell {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>