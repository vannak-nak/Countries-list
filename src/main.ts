import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/tailwind.css';
import {
  Top, Bottom,CircleCloseFilled,
} from '@element-plus/icons-vue';
createApp(App)
  .use(store, axios, router)
  .use(ElementPlus)
  .component('Top', Top)
  .component('Bottom', Bottom)
  .component('CircleCloseFilled', CircleCloseFilled)
  .mount('#app');