<script>
import urlMixin from "@/components/dirContent/mixins/urlMixin.js";

export default {
    name: "PDFModal",
    mixins: [urlMixin],
    mounted() {
        this.$emitter.on("showPDFModal", (item) => {
            this.item = item;
            this.fetchUrl();
        });
    }
}
</script>

<template>
    <div v-if="showModal" class="modal-wrapper">
        <div class="modal">
            <div class="headline">
                The file will be opened in a new tab
            </div>

            <a class="link-btn"
               :href="url"
               target="_blank" @click="showModal = false">
                Open file
            </a>
        </div>
    </div>
</template>

<style scoped>
.headline {
    font-size: 1rem;
    font-weight: bold;
    text-align: left;
    margin-bottom: 2em;
    color: #212121;
}

.link-btn {
    border: none;
    border-radius: 4px;
    padding: 8px 30px;
    color: #fff;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    background-color: #7071E8;
    text-decoration: none;
}
</style>