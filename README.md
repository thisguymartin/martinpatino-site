# Martin Patino - Portfolio Website

A modern, personal portfolio website built with Nuxt 4 and Nuxt UI, showcasing professional work, blog posts, and speaking engagements.

## 🚀 Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com) - The Intuitive Vue Framework
- **UI Library**: [Nuxt UI](https://ui.nuxt.com) - Beautiful UI components built on top of Tailwind CSS
- **Content Management**: [Nuxt Content](https://content.nuxt.com) - File-based CMS with markdown support
- **Image Optimization**: [Nuxt Image](https://image.nuxt.com) - Optimized images with built-in lazy loading
- **Animations**: [Motion-V](https://motion-v.netlify.app) - Vue animation library
- **Icons**: Iconify (Lucide & Simple Icons)
- **Database**: Better SQLite3 (for content management)
- **Package Manager**: pnpm

## 📄 Pages & Architecture

### Current Pages

1. **Home (`/`)** - `app/pages/index.vue`
   - Hero section with introduction
   - Blog preview section
   - FAQ section
   - Components: `LandingHero`, `LandingBlog`, `LandingFAQ`
   - Commented out: `LandingAbout`, `LandingWorkExperience`, `LandingTestimonials`

2. **About (`/about`)** - `app/pages/about.vue`
   - Personal introduction with avatar
   - Biography content from markdown
   - Commented out: Polaroid image gallery

3. **Blog (`/blog`)** - `app/pages/blog/index.vue`
   - List of all blog posts ordered by date (DESC)
   - Animated blog post cards with hover effects
   - Individual post route: `/blog/[...slug]`

4. **Speaking (`/speaking`)** - `app/pages/speaking.vue`
   - Categorized speaking engagements (Conferences, Live talks, Podcasts)
   - Timeline-style layout with dates and locations
   - External links to recordings/resources

### Architecture Overview

```
app/
├── app.vue                 # Root component with SEO meta & search
├── app.config.ts          # Global app configuration
├── pages/
│   ├── index.vue          # Home page
│   ├── about.vue          # About page
│   ├── speaking.vue       # Speaking engagements
│   ├── blog/
│   │   ├── index.vue      # Blog listing
│   │   └── [...slug].vue  # Individual blog posts
│   └── _projects.vue      # Projects (implementation pending)
├── components/
│   ├── AppHeader.vue      # Site header/navigation
│   ├── AppFooter.vue      # Site footer
│   ├── ColorModeButton.vue # Dark/light mode toggle
│   ├── PolaroidItem.vue   # Polaroid image component
│   └── landing/
│       ├── Hero.vue       # Hero section
│       ├── About.vue      # About section
│       ├── Blog.vue       # Blog preview section
│       ├── FAQ.vue        # FAQ section
│       ├── WorkExperience.vue
│       └── Testimonials.vue
├── layouts/
│   └── default.vue        # Default layout wrapper
└── error.vue              # Error page handler

content/
├── index.yml              # Home page content
├── about.yml              # About page content
├── speaking.yml           # Speaking engagements data
├── blog.yml               # Blog configuration
├── projects.yml           # Projects configuration
└── blog/                  # Blog posts (markdown)
    ├── building-vibecheck.md
    ├── sst-v3-api-guide.md
    ├── aws-transfer-family-sftp.md
    ├── adapting-to-change.md
    └── serverless-architecture-intro.md
```

## 🎨 Features

- ✅ **Fully Static Site** - Pre-rendered at build time (SSG), no server required
- ✅ **SEO Optimized** - Meta tags, Open Graph, Twitter Cards, and JSON-LD structured data
- ✅ Dark/Light mode with system preference detection
- ✅ Content search functionality (⌘K)
- ✅ Responsive design
- ✅ Animation on scroll (Motion-V)
- ✅ Blog with markdown support
- ✅ Code highlighting in blog posts
- ✅ Image optimization with WebP format
- ✅ Automatic sitemap generation

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm 10.17.1+

### Installation

```bash
# Install dependencies
pnpm install
```

### Available Scripts

```bash
# Start development server at http://localhost:3000
pnpm dev

# Build for production
pnpm build

# Generate static site
pnpm generate

# Preview production build
pnpm preview

# Lint code
pnpm lint

# Lint and fix
pnpm lint:fix

# Type checking
pnpm typecheck
```

## 📦 Project Configuration

### Nuxt Modules

- `@nuxt/eslint` - ESLint module with stylistic rules
- `@nuxt/image` - Image optimization
- `@nuxt/ui` - UI component library
- `@nuxt/content` - Content management
- `@vueuse/nuxt` - Vue composition utilities
- `motion-v/nuxt` - Animation library

### Build Configuration

The project is configured for **static site generation (SSG)** using Nitro:

```typescript
nitro: {
  preset: 'static',
  prerender: {
    routes: ['/', '/about', '/blog', '/speaking'],
    crawlLinks: true,
    failOnError: false
  },
  static: true
}
```

All routes are pre-rendered at build time using the `prerender: true` route rule. This creates a fully static site with no server runtime required, perfect for hosting on CDNs and static hosting platforms.

## 🎯 Content Management

Content is managed via YAML and Markdown files in the `content/` directory:

- **YAML files** (`.yml`) - Structured data for pages
- **Markdown files** (`.md`) - Blog posts with frontmatter

### Adding Blog Posts

Create a new markdown file in `content/blog/`:

```markdown
---
title: Your Post Title
description: Post description
date: 2025-01-15
image: /images/post-cover.jpg
---

Your content here...
```

### Adding Speaking Events

Edit `content/speaking.yml`:

```yaml
events:
  - title: Event Name
    date: '2025-01-15'
    location: Conference Name
    category: Conference
    url: https://example.com
```

## 🌐 Deployment

This site is configured as a **fully static site** that can be deployed to any static hosting platform or CDN.

### Building for Production

```bash
# Generate static site
pnpm generate
```

This creates a `.output/public` directory containing all pre-rendered HTML, CSS, JS, and assets. The output is completely static with no server runtime required.

### Recommended Hosting Platforms

- **Netlify** - Automatic deployment from Git
- **Vercel** - Zero-config deployment
- **Cloudflare Pages** - Fast global CDN
- **GitHub Pages** - Free static hosting
- **AWS S3 + CloudFront** - Scalable static hosting
- Any static file hosting service

### Build Command for Hosting Platforms

- **Build Command**: `pnpm generate`
- **Output Directory**: `.output/public`
- **Node Version**: 18+

### Environment Variables

Configure in `.env` (if needed):

```bash
# Add any required environment variables here
```

## 📝 SEO Configuration

This site is optimized for search engines with comprehensive SEO features:

### Global SEO (`app/app.vue`)
- Title template: `%s - Martin Patino`
- Open Graph images and metadata
- Twitter Card support (`summary_large_image`)
- Automatic sitemap generation via `@nuxtjs/sitemap`
- Proper HTML lang attribute and meta tags

### Page-Level SEO
Each page uses `useSeoMeta()` for customized metadata:
- Custom titles and descriptions
- Per-page Open Graph images
- Dynamic meta tags based on content

### Structured Data (JSON-LD)
- **Person Schema** on homepage - Provides information about Martin Patino
- **Article Schema** on blog posts - Rich snippets for blog content
- Improves search engine understanding and rich results

### Static Site SEO Benefits
- All pages pre-rendered with full content at build time
- Fast initial page load improves Core Web Vitals
- No JavaScript required for content rendering
- Perfect for search engine crawlers

## 🎨 Theming

Theme configuration in `app/app.config.ts`:

```typescript
ui: {
  colors: {
    primary: 'green',
    neutral: 'neutral'
  }
}
```

## 📱 Contact & Social

- **Email**: martin@gizmodlabs.com
- **GitHub**: [@thisguymartin](https://github.com/thisguymartin)
- **X (Twitter)**: [@thisguymartin](https://x.com/thisguymartin)

## 📄 License

© 2025 Martin Patino. All rights reserved.
