import Vue3Toastify, { toast } from 'vue3-toastify'
import type { ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, {
    autoClose: 3000,
    position: 'top-right',
    transition: 'slide',
    closeOnClick: true,
    pauseOnHover: true,
  } as ToastContainerOptions)

  return {
    provide: { toast },
  }
})
