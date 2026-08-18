import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './animations/gsap'
import './styles/global.scss'

createApp(App).use(router).mount('#app')

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    void navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`)
  })
}
