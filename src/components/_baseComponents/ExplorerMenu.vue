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

</style>