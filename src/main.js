import { createApp } from 'vue'
import App from './App.vue'
import http from "@/services/http.js";
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();

app.config.globalProperties.$http = http;

app.use(pinia);
app.mount('#app');
