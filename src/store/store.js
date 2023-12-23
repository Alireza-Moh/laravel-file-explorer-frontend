import { reactive } from 'vue'

export const store = reactive({
    baseUrl: null,
    isLoading: false,
    setBaseUrl(newValue) {
        this.baseUrl = newValue;
    },
    setIsLoading(newValue) {
        this.isLoading = newValue;
    }
})
