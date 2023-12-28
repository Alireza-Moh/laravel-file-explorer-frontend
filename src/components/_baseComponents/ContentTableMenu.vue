<script>
export default {
  name: "ExplorerMenu",
  emits: ["update:modelValue", "changeVariant"],
  props: {
    item: Object
  }
}
</script>

<template>
  <div class="sub-nav">
    <div class="path-box">
      <div class="path">
        <img src="../../assets/img/folder-check.svg" alt="">
        <span v-if="item">{{item.url}}</span>
        <span v-else>Click on an item to get path</span>
      </div>
      <img src="../../assets/img/copy.svg" alt="" width="16" height="16" class="copy-icon">
    </div>
    <input type="search" name="itemSearch" id="itemSearch" placeholder="Type to search" @input="$emit('update:modelValue', $event.target.value)">
    <div class="action-box">
      <button class="action-btn">
        <img src="../../assets/img/arrow-clockwise.svg" alt="">
      </button>
      <button class="action-btn" @click="$emit('changeVariant')">
        <img src="../../assets/img/list-ul.svg" alt="">
      </button>
    </div>
  </div>
</template>

<style scoped>
.sub-nav {
  padding: 15px;
  border-bottom: 1px solid #e8ebef;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.path-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.path {
  display: flex;
  align-items: center;
  gap: 10px;
}

.action-box {
  display: flex;
  align-items: center;
}

.path-box {
  border: 1px solid #e8ebef;
  padding: 5px 12px;
  border-radius: 4px;
  font-size: 12px;
  flex-grow: 3;
}

.copy-icon {
  cursor: pointer;
}

#itemSearch {
  padding: 5px 12px;
  border: 1px solid #e8ebef;
  border-radius: 4px;
  outline-color: #7071E8;
  width: 300px;
}
</style>