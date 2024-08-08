export default {
    data() {
        return {
            item: null,
            url: "",
            showModal: false
        }
    },
    methods: {
        fetchUrl() {
            const url= 'disks/'
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