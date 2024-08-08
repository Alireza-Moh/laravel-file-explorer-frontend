<script>
import urlMixin from "@/components/dirContent/mixins/urlMixin.js";

export default {
    name: "ImageViewer",
    mixins: [urlMixin],
    mounted() {
        this.$emitter.on("showImageViewer", (item) => {
            this.item = item;
            this.fetchUrl();
        });
    }
}
</script>

<template>
    <div v-if="showModal" class="modal-wrapper">
        <span class="close" @click="showModal = false">
            &times;
        </span>
        <img :src="url"
             alt="Original"
             class="modal-content modal-img"/>
    </div>
</template>