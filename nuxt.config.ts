// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Enable SSR for static site generation (pre-rendering)
  // This is NOT the same as runtime SSR - pages are pre-rendered at build time
  ssr: true,

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'motion-v/nuxt',
    '@nuxtjs/sitemap'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-11-01',

  site: {
    url: 'https://martinpatino.com',
    name: 'Martin Patino - Senior Software Engineer'
  },

  sitemap: {
    exclude: [
      '/_projects'
    ]
  },

  // Nitro configuration for static site generation
  nitro: {
    preset: 'static',
    prerender: {
      routes: [
        '/',
        '/about',
        '/blog',
        '/speaking'
      ],
      crawlLinks: true,
      // Ensure all routes are discovered and pre-rendered
      failOnError: false
    },
    // Configure for static output
    static: true
  },

  // Optimize images for static site
  image: {
    provider: 'ipx',
    quality: 80,
    format: ['webp']
  },

  // Route rules for static generation
  routeRules: {
    // Pre-render all pages at build time
    '/**': { prerender: true }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})