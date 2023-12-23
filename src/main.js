import { createApp } from 'vue'
import App from './App.vue'
import {store} from "@/store/store.js";
import http from "@/services/http.js";
const app = createApp(App)

app.config.globalProperties.$store = store;
app.config.globalProperties.$http = http;

app.mount('#app')
