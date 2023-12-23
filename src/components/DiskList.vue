<script>
export default {
  name: "DiskList",
  props: {
    disks: {
      type: Object
    },
    defaultDisk: {
      type: String
    }
  },
  methods: {
    isSelectedDisk(diskName) {
      return diskName === this.defaultDisk;
    }
  }
}
</script>

<template>
  <div class="global-nav">
    <button class="action-btn" v-for="diskName in disks" :class="{selected: isSelectedDisk(diskName)}" :disabled="isSelectedDisk(diskName)">
      <img src="../assets/img/hdd.svg" alt="hdd">
      <span class="action-btn__text">{{diskName}}</span>
    </button>
  </div>
</template>

<style>
.global-nav,
.sub-nav {
  padding: 15px;
  border-bottom: 1px solid #e8ebef;
  display: flex;
  align-items: center;
  gap: 10px;
}

.creation-box,
.edit-box {
  display: flex;
  align-items: center;
  gap: 20px;
}


.action-btn {
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s linear;
}

.action-btn:hover {
  background-color: #F2F2F3;
}

.sub-nav {
  justify-content: space-between;
  gap: 10px;
}

.action-box,
.search-box,
.path-box {
  display: flex;
  align-items: center;
}

.search-box {
  gap: 10px;
}

.path-box {
  border: 1px solid #e8ebef;
  padding: 5px 12px;
  border-radius: 4px;
  font-size: 12px;
  gap: 10px;
  flex-grow: 3;
}

.search-box {
  flex-grow: 1;
}

#itemSearch {
  padding: 5px 12px;
  border: 1px solid #e8ebef;
  border-radius: 4px;
  outline-color: #7071E8;
  width: 100%;
}
</style>