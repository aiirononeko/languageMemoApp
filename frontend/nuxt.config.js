require('dotenv').config()

module.exports = {

  /*
   ** Environment Variables
   */
  env: {
    baseUrl: process.env.BASE_URL || "http://localhost:3000",
  },

  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: { lang: "ja" },
    title: "Poeta",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  /*
   ** Customize the progress bar color
   */
  loading: { color: "#3B8070" },

  /*
   ** modules
   */
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/device",
    "@nuxtjs/sitemap",
    "@nuxtjs/vuetify",
  ],

  /*
   ** build modules
   */
  buildModules: [
    "@nuxtjs/dotenv",
    "@nuxtjs/style-resources",
    // "@nuxtjs/google-analytics",
    // "@nuxtjs/pwa" // pwaは開発時にバグりやすいので、しばらくはコメント,
  ],

  /*
   ** plugins
   */
  plugins: [
    "~/plugins/axios",
    { src: "~/plugins/vue-mavon-editor", ssr: false },
  ],

  /*
   ** Global css
   */
  css: [{ src: "~/assets/sass/app.scss", lang: "scss" }],

  // router: {
  //   middleware: ["check-auth"],
  // },

  /*
   ** Axios configuration
   */
  axios: {
    // axios options
    baseURL: process.env.BASE_URL || "http://localhost:3000",
  },

  /*
   ** Google Analytics configuration
   */
  // googleAnalytics: {
  //   // google analytics options
  //   id: 'UA-12301-2'
  // },

  /*
   ** Sitemap configuration
   */
  sitemap: {
    // sitemap options
    hostname: process.env.BASE_URL || "http://localhost:3000",
    gzip: true,
  },

  /*
   ** Style Resources configuration
   */
  styleResources: {
    scss: [
      "~/assets/sass/variable.scss",
      "~/assets/sass/functions/**.scss"
    ]
  },

  /*
   ** Build configuration
   */
  build: {
    extractCSS: true,
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
        })
      }
    },
  },
}
