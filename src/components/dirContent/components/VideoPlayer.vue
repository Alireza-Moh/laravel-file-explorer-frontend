<script>
import urlMixin from "@/components/dirContent/mixins/urlMixin.js";

export default {
    name: "VideoPlayerViewer",
    mixins: [urlMixin],
    mounted() {
        this.$emitter.on("showVideoPlayer", (item) => {
            this.item = item;
            this.fetchUrl();
        });
    }
}
</script>

<template>
    <div v-if="showModal" class="modal">
        <span class="close" @click="showModal = false">&times;</span>
        <div class="modal-content">
            <video class="video" controls>
                <source :src="item.url"
                        :type="item.videoType"
                        class="video-src">
            </video>
        </div>
    </div>
</template>

<style scoped>
.video {
    width: 100%;
    height: 100%;
}
</style>