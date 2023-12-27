<script>
import storesMixin from "@/mixins/storesMixin.js";

export default {
  name: "RightClickContextMenu",
  mixins: [storesMixin],
  props: {
    left: Number,
    top: Number,
    dir: {}
  },
  methods: {
    renameDir() {
      this.$emit("renameDir");
    },
    deleteDir() {
      const url = this.settingsStore.baseUrl + "disks/" + this.dir.diskName + "/dirs/" + this.dir.label
      const option = {
        body: JSON.stringify({
          path: this.dir.path
        })
      };

      this.$http.delete(url, option).then((data) => {
        if (data.result) {
          window.showAlert(data.result.status, data.result.message);
        }
      });
    }
  }
}
</script>

<template>
  <div class="content" :style="{ top: top + 'px', left: left + 'px' }">
    <ul class="menu">
      <li class="item" @click="renameDir">
        <img src="../../assets/img/pen.svg" alt="rename">
        <span>Rename</span>
      </li>
      <li class="item" @click="deleteDir">
        <img src="../../assets/img/trash3.svg" alt="">
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
</style>