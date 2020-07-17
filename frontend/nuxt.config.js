module.exports = {
  mode: 'spa',

  /*
   ** Frontend Config Variables
   */
  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL || "http://localhost:3000",
    clientUrl: process.env.CLIENT_URL || "http://localhost:3001",
  },

  /*
   ** Server Config Variables
   */
  privateRuntimeConfig: {},

  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: { lang: "ja" },
    title: "Poeta",
    titleTemplate: "%s | Poeta",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "og:site_name", property: "og:site_name", content: "Poeta" },
      { hid: "og:type", property: "og:type", content: "website" },
      { hid: "og:url", property: "og:url", content: process.env.clientUrl },
      { hid: "og:title", property: "og:title", content: "Poeta" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Marck+Script" }
    ],
  },

  /*
   ** Customize the progress bar color
   */
  loading: { color: "#3B8070" },

  /*
   ** modules
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/device", "@nuxtjs/sitemap"],

  /*
   ** build modules
   */
  buildModules: [
    "@nuxtjs/style-resources",
    "@nuxtjs/vuetify",
    // "@nuxtjs/google-analytics",
    "@nuxtjs/pwa",
  ],

  /*
   ** plugins
   */
  plugins: [
    '~/plugins/nuxt-client-init.client.js',
    "~/plugins/axios",
    "~/plugins/vue-mavon-editor.client.js",
  ],

  components: true,

  /*
   ** Global css
   */
  css: [{ src: "~/assets/sass/app.scss", lang: "scss" }],

  router: {
    middleware: ["check-auth", "check-cookie-integrity"],
  },

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
    exclude: ["/", "/password/reset/confirm", "/edit/success"],
  },

  /*
   ** PWA configuration
   */
  pwa: {
    /* icon options */
    icon: {
      iconSrc: "poeta-icon.png"
    },
    /* workbox options */
    workbox: {
      runtimeCaching: [
        {
          urlPattern: "^https://cdn.jsdelivr.net/(.*)",
          handler: "cacheFirst",
        },
        {
          urlPattern: "^https://fonts.googleapis.com/(.*)",
          handler: "cacheFirst",
        },
      ],
    },
  },

  /*
   ** Style Resources configuration
   */
  styleResources: {
    scss: ["~/assets/sass/variable.scss", "~/assets/sass/functions/**.scss"],
  },

  telemetry: false,

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
        });
      }
    },
  },
};
