import {defineStore} from "pinia";

export const useSettingsStore = defineStore("settings", {
    state: () => ({
        baseUrl: ""
    }),

    getters: {
        getBaseUrl: (state) => state.baseUrl
    },
    actions: {
        setBaseUrl(baseUrl) {
            this.baseUrl = baseUrl;
        }
    }
});