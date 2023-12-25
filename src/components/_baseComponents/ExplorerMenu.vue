<script>
export default {
  name: "ExplorerMenu"
}
</script>

<template>
  <div class="sub-nav">
    <div class="action-box">
      <button class="action-btn">
        <img src="../../assets/img/arrow-left.svg" alt="">
      </button>
      <button class="action-btn">
        <img src="../../assets/img/arrow-right.svg" alt="">
      </button>
      <button class="action-btn">
        <img src="../../assets/img/arrow-clockwise.svg" alt="">
      </button>
    </div>
    <div class="path-box">
      <img src="../../assets/img/folder-check.svg" alt="">
      <span>Path://public_html/files/web Assests/</span>
    </div>
    <div class="search-box">
      <input type="search" name="itemSearch" id="itemSearch" placeholder="Type to search">
      <button class="action-btn">
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