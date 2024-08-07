<script>
export default {
    name: "ImageViewer",
    data() {
        return {
            item: "",
            url: "",
            showModal: false
        }
    },
    mounted() {
        this.$emitter.on("showImageViewer", (item) => {
            this.item = item;
            this.getUrl();
        });
    },
    methods: {
        getUrl() {
            const url = 'disks/'
                + this.item.diskName
                + '/items/url?'
                + new URLSearchParams({
                    path: encodeURIComponent(this.item.path)
                });

            this.$API.get(url).then(response => {
                this.url = response.data.result.url;
                this.showModal = true;
            }).catch(error => {
                window.showAlert(error.response.data.status, error.response.data.message);
            }).finally(() => {
                this.$emitter.emit("fetchingData");
            });
        }
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

<style scoped>
.modal-wrapper {
    background-color: rgba(0, 0, 0, 0.9);
}

.modal-content {
    margin: auto;
    display: block;
    max-width: 80%;
    max-height: 80%;
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