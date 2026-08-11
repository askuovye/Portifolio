import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './animations/gsap'
import './styles/global.scss'

createApp(App).use(router).mount('#app')
