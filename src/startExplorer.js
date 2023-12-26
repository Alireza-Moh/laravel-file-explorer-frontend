import FileManager from './App.vue';

export default {
    install: (app, options) => {

        app.component('file-manager', FileManager);

    },
};