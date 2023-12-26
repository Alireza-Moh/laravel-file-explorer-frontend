import { createApp } from 'vue'
import App from './App.vue'
import http from "@/services/http.js";
import { createPinia } from 'pinia';
import mitt from "mitt";

const app = createApp(App);

app.config.globalProperties.$http = http;
app.config.globalProperties.$emitter = mitt();

app.use(createPinia());
app.mount('#app');
