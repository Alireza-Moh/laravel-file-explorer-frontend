import {createApp} from 'vue'
import FileExplorer from './FileExplorer.vue'
import {createPinia} from 'pinia';
import mitt from "mitt";
import Api from "@/services/Api.js";

const fileExplorer = createApp(FileExplorer, {setting: {baseUrl: "http://localhost:8084/api/laravel-file-explorer/"}});

fileExplorer.config.globalProperties.$API = Api;
fileExplorer.config.globalProperties.$emitter = mitt();

fileExplorer.use(createPinia());

fileExplorer.mount('#fileExplorer-container');
