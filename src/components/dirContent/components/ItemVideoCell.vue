<script>
export default {
  name: "ItemVideoCell",
  props: {
    itemUrl: {
      type: String
    },
    videoType: {
      type: String
    }
  }
}
</script>

<template>
  <video width="80" height="80" muted>
    <source :src="itemUrl"
            :type="videoType"
            class="video-src">
  </video>
</template>