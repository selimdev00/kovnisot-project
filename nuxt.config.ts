// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/styles/main.scss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@pinia/nuxt', '@nuxt/test-utils/module'],

  pinia: {
    storesDirs: ['./store'],
  },
  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
  },
  ssr: false,
  typescript: {
    typeCheck: true,
  },
})
