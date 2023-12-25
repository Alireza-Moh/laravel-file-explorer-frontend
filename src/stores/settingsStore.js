import {defineStore} from "pinia";

export const useSettingsStore = defineStore("settings", {
    state: () => ({
        baseUrl: "",
        defaultFileExplorerViewData: {}
    }),
    actions: {
        setBaseUrl(baseUrl) {
            this.baseUrl = baseUrl;
        },
        setDefaultFileExplorerViewData(defaultFileExplorerViewData) {
            Object.keys(defaultFileExplorerViewData).forEach(key => {
                this.defaultFileExplorerViewData[key] = defaultFileExplorerViewData[key];
            });
        }
    }
});