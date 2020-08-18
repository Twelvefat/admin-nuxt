
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#1DA57A' },
  /*
  ** Global CSS
  */
  css: [
    // 'ant-design-vue/dist/antd.css',
    '~/assets/global.css',
    { src: 'ant-design-vue/dist/antd.less', lang: 'less' }
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/antd-ui'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/moment'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/auth'
  ],
  moment: {
    locales: ['id']
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.BASE_URL || 'http://192.168.100.4:8000/api/v1',
  },
  router: {
    middleware: ['auth']
  },
  auth: {
    redirect: {
      login: '/login',
      home: '/',
      logout: '/login'
    },
    localStorage: false,
    cookie: {
      options: {
        expires: 7
      }
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/login',
            method: 'post',
            propertyName: 'token'
          },
          user: {
            url: '/me',
            method: 'get',
            propertyName: 'user'
          },
          logout: {
            url:'/logout',
            method: 'get'
          },
        },
        tokenRequired:true,
        tokenType:'Bearer'
      }
    },
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
    loaders: {
      less: {
        modifyVars: {
          'primary-color': '#1DA57A',
          'layout-header-background': '#FFFFFF',
          'layout-trigger-background':'#1DA57A'
        },
        javascriptEnabled: true
      }
    }
  }
}
