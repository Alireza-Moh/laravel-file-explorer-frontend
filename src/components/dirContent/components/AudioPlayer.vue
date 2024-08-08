<script>
import urlMixin from "@/components/dirContent/mixins/urlMixin.js";

export default {
    name: "AudioPlayer",
    mixins: [urlMixin],
    mounted() {
        this.$emitter.on("showAudioPlayer", (item) => {
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
            <audio controls class="audio">
                <source :src="item.url"
                        :type="item.audioType"
                        class="video-src">
            </audio>
        </div>
    </div>
</template>

<style scoped>
.audio {
    width: 600px;
}
</style>