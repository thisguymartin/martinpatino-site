export default defineAppConfig({
  global: {
    picture: {
      dark: 'https://avatars.githubusercontent.com/u/13192083?v=4',
      light: 'https://avatars.githubusercontent.com/u/13192083?v=4',
      alt: 'My profile picture'
    },
    meetingLink: '',
    email: 'martin@sibipro.com',
    available: true
  },
  ui: {
    colors: {
      primary: 'teal',
      neutral: 'slate'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  },
  footer: {
    credits: `Built with Nuxt UI • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-x',
      'to': 'https://x.com/thisguymartin',
      'target': '_blank',
      'aria-label': 'X'
    }, {
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/thisguymartin',
      'target': '_blank',
      'aria-label': 'GitHub'
    }]
  }
})
