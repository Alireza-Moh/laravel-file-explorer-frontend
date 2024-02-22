export default {
    methods: {
        showErrorModal(data, headline = "Errors", showErrorKey = false) {
            if (data.errors) {
                this.$emitter.emit(
                    "showErrorModal",
                    {
                        headline: headline,
                        errors: data.errors,
                        showErrorKey: showErrorKey
                    }
                );
            }
        }
    }
}