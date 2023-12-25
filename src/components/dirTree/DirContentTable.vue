<script>

import storesMixin from "@/mixins/storesMixin.js";

export default {
  name: "DirContentTable",
  mixins: [storesMixin],
  data() {
    return {
      dirItems: []
    }
  },
  created() {
    this.dirItems = this.settingsStore.defaultFileExplorerViewData.selectedDirItems;
  },
  mounted() {
    this.settingsStore.$subscribe((mutation, state) => {
      this.dirItems = state.defaultFileExplorerViewData.selectedDirItems;
    })
  }
}
</script>

<template>
  <div class="fodler-content-box" id="dirItemTable">
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
        <tr v-for="(item, index) in dirItems" :key="index">
          <td>
            <input type="checkbox" name="folder-item" class="folder-item-checkbox">
          </td>
          <td>
            <img v-if="item.type === 'dir'" src="../../assets/img/folder-fill.svg" alt="folder icon" class="folder__icon">
            <img v-if="item.type === 'file'" src="../../assets/img/file-earmark-fill.svg" alt="file icon" class="folder__icon">
          </td>
          <td class="folder-item-name">
            {{item.name}}
          </td>
          <td>
            {{item.lastModified}}
          </td>
          <td class="td-size">
            {{item.size}}
          </td>
        </tr>
      </template>
      <tr v-else>
        <td class="folder-item-name empty-cell" colspan="5">
          No data found
        </td>
      </tr>
      </tbody>
    </table>
  </div>
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

.td-size {
  text-align: right;
}

.icon-cell {
  width: 20px;
}

.name-cell {
  width: 56%;
}

.folder-item-checkbox {
  accent-color: #7071E8;
}

.empty-cell {
  text-align: center;
  font-size: 1.1rem;
}
</style>