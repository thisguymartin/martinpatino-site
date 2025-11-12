import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://martinpatino.com',
  integrations: [
    tailwind(),
    sitemap(),
    icon()
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },
  output: 'static',
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    ssr: {
      noExternal: ['@astrojs/tailwind']
    }
  }
});
