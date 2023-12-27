<script>
import storesMixin from "@/mixins/storesMixin.js";
import ContentTableRow from "@/components/dirTree/components/ContentTableRow.vue";

export default {
  name: "DirContentTable",
  components: {ContentTableRow},
  mixins: [storesMixin],
  data() {
    return {
      dirItems: [],
      selectedDir: null,
      selectedDisk: null
    }
  },
  created() {
    const defaultData = this.settingsStore.defaultFileExplorerViewData;

    this.dirItems = defaultData.selectedDirItems;
    this.selectedDir = defaultData.selectedDir;
    this.selectedDisk = defaultData.selectedDisk;
  },
  mounted() {
    this.settingsStore.$subscribe((mutation, state) => {
      const defaultData = state.defaultFileExplorerViewData;

      this.dirItems = defaultData.selectedDirItems;
      this.selectedDir = defaultData.selectedDir;
      this.selectedDisk = defaultData.selectedDisk;
    });

    this.dirItemsStore.$subscribe((mutation, state) => {
      const dir = state.data.find((dir) => (dir.diskName === this.selectedDisk) && (dir.dirName === this.selectedDir));
      if (dir && dir.dirItems) {
        this.dirItems = dir.dirItems;
      }
    });
  }
}
</script>

<template>
  <table class="folder-content__table">
    <thead>
    <tr>
      <th class="icon-cell"></th>
      <th class="icon-cell"></th>
      <th class="name-cell">Name</th>
      <th>Modified</th>
      <th class="th-size">Size</th>
    </tr>
    </thead>
    <tbody>
    <template v-if="dirItems.length > 0">
      <ContentTableRow v-for="(item, index) in dirItems" :key="index" :item="item"/>
    </template>
    <tr v-else>
      <td class="folder-item-name empty-cell" colspan="5">
        No data found
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
.folder-content__table {
  width: 100%;
  table-layout: fixed;
  text-align: left;
  border-collapse: collapse;
}

thead {
  background-color: #F8F9FA;
}

tr {
  transition: all 0.3s linear;
}

tr:hover {
  background-color: #F8F9FA;
}

td, th {
  padding: 15px 20px;
}

td {
  font-size: 14px;
}

th {
  font-size: 14px;
  font-weight: bold;
}

tr {
  border-bottom: 1px solid #e8ebef;
}

.th-size {
  text-align: right;
}

.icon-cell {
  width: 20px;
}

.name-cell {
  width: 56%;
}

.empty-cell {
  text-align: center;
  font-size: 1.1rem;
}
</style>