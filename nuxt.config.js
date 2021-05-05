import colors from 'vuetify/es5/util/colors'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - akibako-nuxt',
    title: 'あきばこ工房',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/img.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // '@nuxtjs/router',
    '@nuxtjs/google-analytics'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    // 'nuxt-content',
    '@nuxt/content',
    ['@nuxtjs/google-adsense', {
      id: 'ca-pub-8656421186521759',
      test: false
    }]
  ],
  publicRuntimeConfig: {
    ipfsRoot: 'QmXHFDwTgDALHWf5dvTvfKEGHALfE4ecqdYJJAMrEuA62L'
  },

  generate: {
    routes: async function () { //  { $config: { ipfsRoot } }
      // const { $content } = require('nuxt-content')
      const { $content } = require('@nuxt/content')
      // const conf = require('nuxt.config')

      const files = await $content('ipfs', { deep: true }).only(['path']).fetch()
      // const files = await $content('posts').only(['path']).fetch()

      const reg = /\/ipfs\/(\d{4})-(\d{2})-(\d{2})-(.+)\/index/
      // const reg = new RegExp(`\/QmXHFDwTgDALHWf5dvTvfKEGHALfE4ecqdYJJAMrEuA62L\/(\d{4})-(\d{2})-(\d{2})-(.+)\/index`)
      // const reg = /\/posts\/(\d{4})-(\d{2})-(\d{2})-(.+)/
      const reduce = files.reduce((p, c) => {
        const m = c.path.match(reg)
        if (m) {
          p.push(`/${m[1]}/${m[2]}/${m[3]}/${m[4]}`)
        }
        return p
      }, [])
      // console.log(reduce)
      return reduce
/*
      const { $content } = require('@nuxt/content')
      const files = await $content('posts').only(['path']).fetch()
      const reg = /\/posts\/(\d{4})-(\d{2})-(\d{2})-(.+)/
      const map = files.map((file) => {
        const m = file.path.match(reg)
        return m ? `/${m[1]}/${m[2]}/${m[3]}/${m[4]}` : null
      })
      console.log(map)
      return map
*/
    }
  },
  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    fullTextSearchFields: ['title', 'description'],
    ipfsApiEndpoint: 'http://127.0.0.1:5002'
    // ipfsRoot: 'QmXHFDwTgDALHWf5dvTvfKEGHALfE4ecqdYJJAMrEuA62L'
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  // router: {
  //   extendRoutes (routes) {
  //     routes.push({name: 'old-path', path: '/old-path', component: '~pages/index.vue'})
  //   }
  // },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  googleAnalytics: {
    // Options
    id: 'UA-55797371-4'
  }

}
