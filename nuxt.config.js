import colors from 'vuetify/es5/util/colors'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - akibako-koubou',
    title: 'あきばこ工房',
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: http://ogp.me/ns#'
    },
    meta: [
      {charset: 'utf-8'},
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'I read in a book when I was young that \'software without bugs is obsolete software\'. A colleague once told me, \'You seem to be channeling your PC\'.'
      },
      {hid: 'og:site_name', property: 'og:site_name', content: 'Akibako-koubou'},
      {hid: 'og:type', property: 'og:type', content: 'website'},
      {hid: 'og:url', property: 'og:url', content: 'https://akibakokoubou.jp'},
      {name: 'twitter:card', content: 'summary_large_image'}
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
    '@nuxtjs/google-analytics',
    '@nuxtjs/dotenv'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/i18n'
  ],
  i18n: {
    locales: ['ja', 'es'],
    defaultLocale: 'ja',
    vueI18n: {
      fallbackLocale: 'ja',
      messages: {
        en: {
          welcome: 'Welcome'
        },
        ja: {
          welcome: ''
        }
      }
    }
  },
  publicRuntimeConfig: {
    ipfsRoot: process.env.ROOT_CID,
    staticStore: process.env.STATIC_STORE || '',
    blogServiceEndpoint: process.env.BLOG_SERVICE_ENDPOINT,
    categories: [
      {
        icon: 'mdi-apps',
        title: 'Home',
        to: '/'
      },
      {
        icon: 'mdi-content-save-all-outline',
        title: 'floppy-disk-cd-rom-label-collections',
        to: '/categories/floppy-disk-cd-rom-label-collections'
      },
      {
        icon: 'mdi-book-open-variant',
        title: 'old-books-of-computer',
        to: '/categories/old-books-of-computer'
      },
      {
        icon: 'mdi-dog',
        title: 'どうぶつの森',
        to: '/categories/どうぶつの森'
      },
      {
        icon: 'mdi-package-variant-closed',
        title: 'sand-box',
        to: '/categories/sand-box'
      },
      {
        icon: 'mdi-grid',
        title: '54文字',
        to: '/categories/54文字'
      },
      {
        icon: 'mdi-gift',
        title: '怪しい引き出物',
        to: '/categories/怪しい引き出物'
      },
      {
        icon: 'mdi-bicycle-penny-farthing',
        title: '古物写真',
        to: '/categories/古物写真'
      },
      {
        icon: 'mdi-sitemap',
        title: 'software',
        to: '/categories/software'
      },
      {
        icon: 'mdi-web',
        title: 'web-tips',
        to: '/categories/web-tips'
      },
      {
        icon: 'mdi-language-cpp',
        title: 'c-tips',
        to: '/categories/c-tips'
      },
      {
        icon: 'mdi-android',
        title: 'android/ios-tips',
        to: '/categories/androidios-tips'
      },
      {
        icon: 'mdi-language-java',
        title: 'java-tips-scala-tips',
        to: '/categories/java-tips-scala-tips'
      },
      {
        icon: 'mdi-language-java',
        title: 'java-tips',
        to: '/categories/java-tips'
      },
      {
        icon: 'mdi-book-open-variant',
        title: 'マイコン老年の今時のプログラム技術',
        to: '/categories/マイコン老年の今時のプログラム技術'
      },
      {
        icon: 'mdi-publish',
        title: 'publishsoft',
        to: '/categories/publishsoft'
      },
      {
        icon: 'mdi-chat',
        title: 'smalltalk',
        to: '/categories/smalltalk'
      },
      {
        icon: 'mdi-gamepad-variant',
        title: 'ゲーム',
        to: '/categories/ゲーム'
      },
      {
        icon: 'mdi-filmstrip-box-multiple',
        title: '映画',
        to: '/categories/映画'
      },
      {
        icon: 'mdi-lightbulb-on',
        title: 'オープンアイデア',
        to: '/categories/オープンアイデア'
      },
      {
        icon: 'mdi-account-details',
        title: 'ニューロエンジン',
        to: '/categories/ニューロエンジン'
      },
      {
        icon: 'mdi-message-bulleted',
        title: '言葉の欠片',
        to: '/categories/言葉の欠片'
      },
      {
        icon: 'mdi-note',
        title: '日々の適当な覚え書き',
        to: '/categories/日々の適当な覚え書き'
      },
      {
        icon: 'mdi-book-open-variant',
        title: 'easypost',
        to: '/categories/easypost'
      },
      {
        icon: 'mdi-account-hard-hat',
        title: '旧ログ-コード採掘場',
        to: '/categories/旧ログ-コード採掘場'
      },
      {
        icon: 'mdi-yahoo',
        title: 'yahooj-port',
        to: '/categories/yahooj-port'
      },
      {
        icon: 'mdi-leaf',
        title: '旧ログ-seasonal-leaf',
        to: '/categories/旧ログ-seasonal-leaf'
      },
      {
        icon: 'mdi-book-open-variant',
        title: '未分類',
        to: '/categories/未分類'
      },
      {
        icon: 'mdi-delete',
        title: '非説明非保証ログ',
        to: '/categories/非説明非保証ログ'
      }
    ]
  },

  generate: {
    async routes() {
      const {$content} = require('@nuxt/content')
      const files = await $content('ipfs', {deep: true}).only(['path']).fetch()
      const reg = /\/ipfs\/(\d{4})-(\d{2})-(\d{2})-(.+)\/index/
      return files.reduce((p, c) => {
        const m = c.path.match(reg)
        if (m) {
          p.push(`/${m[1]}/${m[2]}/${m[3]}/${m[4]}`)
        }
        return p
      }, [])
    }
  },
  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    // fullTextSearchFields: ['title', 'description'],
    ipfsApiEndpoint: process.env.API_ENDPOINT

  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
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
    id: process.env.ANALYTICS
  }
}
