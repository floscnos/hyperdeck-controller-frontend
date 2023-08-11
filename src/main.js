import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from "pinia";
import {iconInit} from "@/assets/icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const app = createApp(App);


iconInit();
app.component('fa-icon', FontAwesomeIcon)

const pinia = createPinia()
app.use(pinia)


app.mount("#app");

