
import http from "@/services/http.js";
import mitt from "mitt";
import {createPinia} from 'pinia';
import FileExplorer from './FileExplorer.vue';

export default {

    install: (app, options) => {
        app.config.globalProperties.$http = http;
        app.config.globalProperties.$emitter = mitt();

        app.use(createPinia());

        app.component("LaravelFileExplorer", FileExplorer);
    }
}