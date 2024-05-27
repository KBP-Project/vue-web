import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import VueCoreUI from '@coreui/vue';
import { CIcon } from '@coreui/icons-vue';
import * as icons from '@coreui/icons';

import App from "./App.vue";

// import router from './router';

import "@/assets/boxicons/css/boxicons.css";

import "./assets/main.css";
import "vue3-toastify/dist/index.css";

// bootstrap
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min";

const app = createApp(App);

app.use(createPinia());
app.config.globalProperties.$axios = axios
app.use(VueCoreUI);
app.provide('icons', icons);
app.component('CIcon', CIcon);

// app.use(router);
app.mount("#app");
