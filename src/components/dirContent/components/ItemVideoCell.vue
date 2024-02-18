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
    <video height="80" muted width="80">
        <source :src="itemUrl"
                :type="videoType"
                class="video-src">
    </video>
</template>