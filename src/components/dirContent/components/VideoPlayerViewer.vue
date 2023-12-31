<script>
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

export default {
  name: "VideoPlayerViewer",
  components: {
    VideoPlayer
  },
  data() {
    return {
      showPlayer: false,
      options: {}
    }
  },
  mounted() {
    this.$emitter.on("showVideoPlayer", (item) => {
      this.options = {
        autoplay: false,
        controls: true,
        sources: [{
          type: item.videoType,
          src: item.url
        }]
      };
      this.showPlayer = true;
    });
  }
}
</script>

<template>
  <div v-if="showPlayer" class="modal">
    <span class="close" @click="showPlayer = false">&times;</span>
    <div class="modal-content">
      <video-player :options="options"/>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
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
</style>