import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "./store";
import axios from 'axios'
import VueAxios from 'vue-axios'

createApp(App).use(store,VueAxios, axios).mount("#app");
