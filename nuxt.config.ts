import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: [
    '~/assets/css/main.css',
  ],
  build: {
    postcss: {
      postcssOptions: require('./postcss.config.js'),
    },
  },
  buildModules: ['@pinia/nuxt'],
  runtimeConfig: {
    treesAPIKey: '',
    public: {
      baseURL: '',
      mapToken: '',
    },
  },
  app: {
    head: {
      link: [{ rel: 'stylesheet', href: 'https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css' }]
    }
  }
});
