<script>
export default {
    name: "VideoPlayerViewer",
    data() {
        return {
            showPlayer: false,
            item: null
        }
    },
    mounted() {
        this.$emitter.on("showVideoPlayer", (item) => {
            this.item = item;
            this.showPlayer = true;
        });
    }
}
</script>

<template>
    <div v-if="showPlayer" class="modal">
        <span class="close" @click="showPlayer = false">&times;</span>
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

.modal {
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
}

.modal-content {
    margin: auto;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.close {
    color: #fff;
    font-size: 40px;
    position: absolute;
    top: 20px;
    right: 30px;
    cursor: pointer;
}

.video {
    width: 100%;
    height: 100%;
}
</style>