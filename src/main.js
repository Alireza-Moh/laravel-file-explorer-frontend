import {createApp} from 'vue'
import FileExplorer from './FileExplorer.vue'
import http from "@/services/http.js";
import {createPinia} from 'pinia';
import mitt from "mitt";

const fileExplorer = createApp(FileExplorer);

fileExplorer.config.globalProperties.$http = http;
fileExplorer.config.globalProperties.$emitter = mitt();

fileExplorer.use(createPinia());

fileExplorer.mount('#fileExplorer-container');
