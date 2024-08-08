import {createApp} from 'vue'
import FileExplorer from './FileExplorer.vue'
import {createPinia} from 'pinia';
import mitt from "mitt";

const fileExplorer = createApp(FileExplorer, {setting: {baseUrl: "http://localhost:8084/api/laravel-file-explorer/"}});

fileExplorer.config.globalProperties.$emitter = mitt();

fileExplorer.use(createPinia());

fileExplorer.mount('#fileExplorer-container');
