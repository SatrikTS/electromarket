// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      title: 'Инструменты Крым',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Продажа электроинструмента в Крыму и Севастополе. Продаем инструмент также в Симферополе, Ялте и других городах Крыма' }
      ],
    }
  },
  runtimeConfig: {
    public: {
      SERVER_URL: process.env.SERVER_URL,
      MAIN_URL: process.env.MAIN_URL,
    }
  },
  env: {
    viewport: 'width=device-width, initial-scale=1',
  },
  build: {
    transpile: ['vuetify'],
    extend(config: any, { isDev, isClient }) {
      config.resolve.alias['@'] = path.resolve(__dirname, 'src')
    },
    cache: false
  },
  transpile: [/@vue[\\/]composition-api/],
  modules: [
    '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  components: {
    dirs: [
      '~/features',
      '~/components',
    ],
    // extensions: ['vue'],
  },
  css: [
    '~/assets/styles/main.scss'
  ],
  buildModules: [
    'nuxt-svg-loader',
    '@nuxtjs/composition-api/module'
  ],
  googleFonts: {
    download: true,
    families: {
      Roboto: [400, 500, 600, 700],
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/_variables.scss" as *;'
        }
      }
    },
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  }
})
