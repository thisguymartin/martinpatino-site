<script setup lang="ts">
const { data: page } = await useAsyncData('about', () => {
  return queryCollection('about').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const { global } = useAppConfig()

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description
})

// Animation helpers
const heroAnim = useEntryAnimation({ delay: 0.1 })
const avatarAnim = useEntryAnimation({ delay: 0.2 })
const contentAnim = useEntryAnimation({ delay: 0.3 })
</script>

<template>
  <div v-if="page" class="relative overflow-hidden">
    <!-- Gradient mesh background -->
    <div class="absolute inset-0 gradient-mesh-bg opacity-30" />

    <!-- Animated gradient orbs -->
    <div class="absolute top-20 right-0 w-96 h-96 bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-3xl" />
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl" />

    <UPage>
      <Motion v-bind="heroAnim">
        <UPageHero
          :ui="{
            container: 'py-24 sm:py-32 lg:py-40',
          }"
        >
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative">
            <!-- Left: Avatar and Stats -->
            <Motion v-bind="avatarAnim">
              <div class="flex flex-col items-center lg:items-start space-y-6">
                <!-- Avatar Card -->
                <div class="glass-strong rounded-3xl p-8 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                  <div class="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <UColorModeAvatar
                    class="size-48 sm:size-56 rounded-2xl ring-4 ring-teal-500/50 dark:ring-teal-400/30 ring-offset-4 ring-offset-transparent transition-all duration-300 group-hover:ring-teal-500 dark:group-hover:ring-teal-400 group-hover:scale-105 relative z-10"
                    :light="global.picture?.light!"
                    :dark="global.picture?.dark!"
                    :alt="global.picture?.alt!"
                  />
                </div>

                <!-- Quick Stats -->
                <div class="grid grid-cols-2 gap-4 w-full">
                  <div class="glass-strong rounded-2xl p-4 text-center hover:scale-105 transition-transform relative overflow-hidden group">
                    <div class="absolute inset-0 gradient-accent opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    <div class="text-2xl font-bold gradient-text relative z-10">10+</div>
                    <div class="text-xs text-muted mt-1 relative z-10">Years Experience</div>
                  </div>
                  <div class="glass-strong rounded-2xl p-4 text-center hover:scale-105 transition-transform relative overflow-hidden group">
                    <div class="absolute inset-0 gradient-secondary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    <div class="text-2xl font-bold gradient-text relative z-10">50+</div>
                    <div class="text-xs text-muted mt-1 relative z-10">Projects Completed</div>
                  </div>
                </div>
              </div>
            </Motion>

            <!-- Right: Title and Description -->
            <Motion v-bind="heroAnim">
              <div class="space-y-6">
                <div>
                  <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold">
                    <span class="gradient-text">{{ page.title }}</span>
                  </h1>
                  <p class="mt-4 text-lg sm:text-xl text-muted leading-relaxed">
                    {{ page.description }}
                  </p>
                </div>

                <!-- Contact buttons -->
                <div class="flex flex-wrap gap-3">
                  <UButton
                    label="Get in Touch"
                    icon="i-lucide-mail"
                    size="lg"
                    :to="`mailto:${global.email}`"
                    class="gradient-border"
                  />
                  <UButton
                    label="Download Resume"
                    icon="i-lucide-download"
                    size="lg"
                    variant="outline"
                    color="neutral"
                  />
                </div>
              </div>
            </Motion>
          </div>
        </UPageHero>
      </Motion>

      <!-- Content Section -->
      <UPageSection
        :ui="{
          container: 'py-16 sm:py-24',
        }"
      >
        <Motion v-bind="contentAnim">
          <div class="glass-strong rounded-3xl p-8 sm:p-12 relative overflow-hidden">
            <!-- Decorative gradient accent -->
            <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-500/10 to-transparent rounded-full blur-3xl" />
            <div class="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl" />

            <div class="prose prose-lg dark:prose-invert max-w-none relative z-10">
              <MDC
                :value="page.content"
                unwrap="p"
                class="[&_h2]:gradient-text [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mb-4 [&_h3]:text-primary-500 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-3 [&_p]:text-muted [&_p]:leading-relaxed [&_ul]:text-muted [&_li]:mb-2"
              />
            </div>
          </div>
        </Motion>
      </UPageSection>
    </UPage>
  </div>
</template>
