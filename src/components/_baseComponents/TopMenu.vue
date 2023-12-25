<script>

import storesMixin from "@/mixins/storesMixin.js";

export default {
  name: "TopMenu",
  mixins: [storesMixin],
}
</script>

<template>
  <header>
    <div class="logo">
      Laravel File Explorer
    </div>
  </header>
</template>

<style scoped>
header {
  padding: 0.7em 1em;
  border-bottom: 1px solid #e8ebef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header .logo {
  font-size: 1.3rem;
  font-weight: 500;
  font-style: italic;
  color: #929fb1;
}
</style>