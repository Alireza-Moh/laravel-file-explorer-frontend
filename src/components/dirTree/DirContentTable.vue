<script>
export default {
  name: "DirContentTable",
  props: {
    items: Array
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
      <tr v-for="(item, index) in items" :key="index">
        <td>
          <input type="checkbox" name="folder-item" id="folder-item-checkbox">
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
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.fodler-content-box .folder-content__table {
  width: 100%;
  table-layout: fixed;
  text-align: left;
  border-collapse: collapse;
}

.folder-content__table thead {
  background-color: #F8F9FA;
}

.folder-content__table tr {
  transition: all 0.3s linear;
}

.folder-content__table tr:hover {
  background-color: #F8F9FA;
}

.folder-content__table td, th {
  padding: 15px 20px;
}

.folder-content__table td {
  font-size: 14px;
}

.folder-content__table th {
  font-size: 14px;
  font-weight: bold;
}

.folder-content__table tr {
  border-bottom: 1px solid #e8ebef;
}

.folder-content__table .th-size {
  text-align: right;
}

.folder-content__table .td-size {
  text-align: right;
}

.folder-content__table .icon-cell {
  width: 20px;
}

.folder-content__table .name-cell {
  width: 56%;
}

.folder-content__table #folder-item-checkbox {
  accent-color: #7071E8;
}
</style>