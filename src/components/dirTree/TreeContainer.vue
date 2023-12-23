<script>
import DirTree from "@/components/dirTree/DirTree.vue";

export default {
  name: "TreeContainer",
  components: {DirTree},
  props: {
    dirs: Object,
    selectedDir: String
  }
}
</script>

<template>
  <div class="nav" id="navbar">
    <div class="nav__items">
      <DirTree :selected-dir="selectedDir" :dirs="dirs"/>
    </div>
  </div>
</template>

<style scoped>
.nav {
  width: 250px;
  position: fixed;
  height: 100%;
  margin-top: 2em;
  border-right: 1px solid #e8ebef;
}

.nav__list,
.nav__items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>