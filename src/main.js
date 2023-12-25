import { createApp } from 'vue'
import App from './App.vue'
import http from "@/services/http.js";
import { createPinia } from 'pinia';

const app = createApp(App);

app.config.globalProperties.$http = http;

app.use(createPinia());
app.mount('#app');
