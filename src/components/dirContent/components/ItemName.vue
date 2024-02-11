<script>
export default {
  name: "ItemName",
  props: {
    itemName: {
      type: String
    }
  }
}
</script>

<template>
    <span class="item-name">
        {{itemName}}
    </span>
</template>

<style scoped>

</style>