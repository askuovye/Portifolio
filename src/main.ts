import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { i18n } from './i18n'
import { setupSeoMetadata } from './seo'
import './animations/gsap'
import './styles/global.scss'

setupSeoMetadata(router)
createApp(App).use(router).use(i18n).mount('#app')

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    void navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`)
  })
}
