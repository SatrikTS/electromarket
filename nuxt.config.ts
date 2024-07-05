// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      title: 'Электроинструмент и Крепеж, Крым, Севастополь',
      link: [{ rel: 'icon', type: 'image/x-icon', href: 'https://instrumentsev.ru/favicon.ico' }],
      script: [
        {src: 'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js'},
        {src: 'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-token-with-polyfills-latest.js'},
        {src: 'https://unpkg.com/@vkid/sdk@latest/dist-sdk/umd/index.js'},
        {src: '//code.jivo.ru/widget/u38ujghobp'}
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'keywords', content: 'Электроинструмент, дрели, болгарки, ушм, шуруповерты, лобзики, Севастополь, Крым, Симферополь' },
        { name: 'description', content: 'Продажа электроинструмента в Крыму и Севастополе. Продаем инструмент и крепеж в Симферополе, Севастополе, Ялте и других городах' }
      ],
      htmlAttrs: {
        lang: 'ru'
      }
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
    '@nuxtjs/google-fonts',
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
      Truculenta: [400, 500, 600, 700],
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
