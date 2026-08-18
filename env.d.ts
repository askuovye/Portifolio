/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent
  export default component
}

declare module 'scrolly-video/dist/ScrollyVideo.vue.js' {
  import type { DefineComponent } from 'vue'

  const ScrollyVideo: DefineComponent<{
    src: string
    sticky?: boolean
    full?: boolean
    cover?: boolean
    trackScroll?: boolean
    lockScroll?: boolean
    transitionSpeed?: number
    frameThreshold?: number
    useWebCodecs?: boolean
    onReady?: () => void
  }>

  export default ScrollyVideo
}
