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

- ✅ Server-side rendering (SSR)
- ✅ Static site generation (SSG)
- ✅ Dark/Light mode with system preference detection
- ✅ SEO optimized with meta tags and Open Graph
- ✅ Content search functionality (⌘K)
- ✅ Responsive design
- ✅ Animation on scroll (Motion-V)
- ✅ Blog with markdown support
- ✅ Code highlighting in blog posts
- ✅ Image optimization

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

The project uses Nitro for building with prerendering enabled:

```typescript
nitro: {
  prerender: {
    routes: ['/'],
    crawlLinks: true
  }
}
```

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

### Static Site Generation

```bash
pnpm generate
```

This creates a `.output/public` directory ready for deployment to any static hosting service.

### Environment Variables

Configure in `.env`:

```bash
# Add any required environment variables here
```

## 📝 SEO Configuration

SEO is configured globally in `app/app.vue`:

- Title template: `%s - Martin Patino`
- Open Graph images
- Twitter card support
- Per-page SEO overrides via `useSeoMeta()`

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
