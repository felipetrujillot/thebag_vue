import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/base.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
//import store from './stores/store'
//import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/router'
import axios from 'axios'
const app = createApp(App)
//app.use(createPinia())
app.use(router)
app.use(createPinia())

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem('accessToken')) || null;

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
//app.use(store)


app.config.globalProperties.$filters = {
    currencyUSD(value) {
        if (typeof value !== "number") {
            return value;
        }
        let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        return formatter.format(value);
    }
}



app.mount('#app')






import 'bootstrap/dist/js/bootstrap.js'
