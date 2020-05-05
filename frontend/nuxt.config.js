require('dotenv').config()

module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || "http://localhost:3000"
  },

  /*
   ** Headers of the page
   */
  head: {
    title: "frontend",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { href: "https://use.fontawesome.com/releases/v5.6.1/css/all.css", rel:"stylesheet" }
    ]
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
    "@nuxtjs/vuetify",
    "@nuxtjs/auth",
    "@nuxtjs/markdownit",
    ["nuxt-sass-resources-loader", ["~/assets/sass/variable.scss"]]
  ],

  buildModules: ["@nuxtjs/dotenv"],

  plugins: ["~/plugins/axios"],

  css: [{ src: "~/assets/sass/common.scss", lang: "scss" }],

  axios: {
    // axios options
    baseURL: process.env.BASE_URL || "http://localhost:3000"
  },

  markdownit: {
    injected: true
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
    }
  }
}
