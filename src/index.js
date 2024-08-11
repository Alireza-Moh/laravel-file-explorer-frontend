import mitt from "mitt";
import {createPinia} from 'pinia';
import FileExplorer from './FileExplorer.vue';
import FileExplorerInModal from "@/components/modals/FileExplorerInModal.vue";

export default {

    install: (app, options) => {
        app.config.globalProperties.$emitter = mitt();

        app.use(createPinia());

        app.component("LaravelFileExplorer", FileExplorer);
        app.component("LaravelFileExplorerInModal", FileExplorerInModal);
    }
}