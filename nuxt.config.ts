
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: [
    '@/assets/css/main.css',
  ],
  modules: ['@nuxtjs/tailwindcss','@pinia/nuxt'],
  runtimeConfig: {
    treesAPIKey: '',
    public: {
      baseURL: '',
      mapToken: '',
    },
  },
  routeRules:{
    '/' : {prerender: true}
  }
});
