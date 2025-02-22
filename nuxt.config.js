export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'South Florida Uncharted',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name:"google-site-verification", content:"_U_w5RtHpbDbPdFRdUELkJiaL0Wmzv6eAAVVV5Ew9Fk" },
      { hid: 'description', name: 'description', content: '' },
      {
        hid: 'keywords', 
        name: 'keywords', 
        content: 'miami fishing, miami charter, miami tour, miami eco tour, south florida fishing, south florida guide, south florida charter, south florida tour, kayak, fishing, miami, south florida'
      },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/uncharted-transparent.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Titillium+Web&display=swap' }
    ]
  },

  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    CONTENTFUL_API_HOST: process.env.CONTENTFUL_API_HOST,
    PAYPAL_CLIENT_ID_SANDBOX: process.env.PAYPAL_CLIENT_ID_SANDBOX,
    PAYPAL_CLIENT_ID_PRODUCTION: process.env.PAYPAL_CLIENT_ID_PRODUCTION,
    PAYPAL_ENVIRONMENT: process.env.PAYPAL_ENVIRONMENT
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css', './css/index.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/contentful',
    '@/plugins/observe-visibility',
    { src: '@/plugins/persisted-state', ssr: false },
    { src: '@/plugins/paypal', ssr: false },
    { src: '@/plugins/fontawesome.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  }
}
