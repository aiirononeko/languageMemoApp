module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/vuetify',
    '@nuxtjs/auth',
    ['nuxt-sass-resources-loader', [
      '~/assets/sass/variable.scss',
    ]],
  ],
  css: [
    { src: '~/assets/sass/common.scss', lang: 'scss' }
  ],
  axios: { 
  },
  // auth: {
  //   strategies: {
  //     local: {
  //       endpoints: {
  //         login: { url: 'api/v1/auth/sign_in', method: 'post', propertyName: 'token' },
  //         user: false,
  //         logout: false
  //       }
  //     }
  //   }
  // },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
}

