import mitt from "mitt";
import {createPinia} from 'pinia';
import FileExplorer from './FileExplorer.vue';
import Api from "@/services/Api.js";

export default {

    install: (app, options) => {
        app.config.globalProperties.$API = Api;
        app.config.globalProperties.$emitter = mitt();

        app.use(createPinia());

        app.component("LaravelFileExplorer", FileExplorer);
    }
}