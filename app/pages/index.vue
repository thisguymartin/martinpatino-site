<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => {
  return queryCollection('index').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description
})

// Add JSON-LD Person schema for SEO
usePersonSchema({
  name: 'Martin Patino',
  url: 'https://martinpatino.com',
  image: 'https://avatars.githubusercontent.com/u/13192083?v=4',
  jobTitle: 'Senior Software Engineer',
  worksFor: {
    name: 'Sibi',
    url: 'https://sibi.com'
  },
  sameAs: [
    'https://github.com/thisguymartin',
    'https://x.com/thisguymartin',
    'https://dev.to/thisguymartin'
  ]
})
</script>

<template>
  <UPage v-if="page">
    <!-- Scroll Progress Indicator -->
    <ScrollProgress />

    <!-- Hero Section -->
    <LandingHero :page />

    <!-- Skills Section -->
    <LandingSkills :page />

    <!-- Work Experience Section -->
    <LandingWorkExperience :page />

    <!-- Featured Projects Section -->
    <LandingProjects />

    <!-- Testimonials Section -->
    <LandingTestimonials :page />

    <!-- Blog Section -->
    <LandingBlog :page />

    <!-- FAQ Section -->
    <LandingFAQ :page />
  </UPage>
</template>
