import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import './assets/css/miningcore.css'
import './assets/css/miningcore-colors.css'

createApp(App).use(router).mount('#app')
