<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()

const { data: posts } = await useAsyncData('index-blogs', () =>
  queryCollection('blog').order('date', 'DESC').limit(3).all()
)
if (!posts.value) {
  throw createError({ statusCode: 404, statusMessage: 'blogs posts not found', fatal: true })
}

// Animation helpers
const titleAnim = useEntryAnimation({ delay: 0.1 })
const cardsAnim = (index: number) => useEntryAnimation({ delay: 0.2 + index * 0.1 })
</script>

<template>
  <UPage>
    <UPageSection
      :ui="{
        container: 'py-16 sm:py-24',
      }"
    >
      <!-- Section Header -->
      <Motion v-bind="titleAnim">
        <div class="mb-12 text-center">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span class="gradient-text">{{ page.blog.title }}</span>
          </h2>
          <p class="mt-4 text-base sm:text-lg text-muted max-w-2xl mx-auto">
            {{ page.blog.description }}
          </p>
        </div>
      </Motion>

      <!-- Blog Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Motion
          v-for="(post, index) in posts"
          :key="index"
          v-bind="cardsAnim(index)"
        >
          <NuxtLink
            :to="post.path"
            class="group block h-full"
          >
            <div class="glass-strong rounded-2xl overflow-hidden h-full flex flex-col hover:scale-[1.02] transition-all duration-300 relative">
              <!-- Gradient overlay on hover -->
              <div class="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300 z-10 pointer-events-none" />

              <!-- Image with gradient overlay -->
              <div class="relative overflow-hidden aspect-video bg-gradient-to-br from-teal-500/10 to-purple-500/10">
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                <NuxtImg
                  v-if="post.image"
                  :src="post.image"
                  :alt="post.title"
                  class="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <UIcon
                    name="i-lucide-file-text"
                    class="size-16 text-muted"
                  />
                </div>

                <!-- Date badge -->
                <div class="absolute top-4 right-4 z-20">
                  <div class="glass-strong rounded-lg px-3 py-1 text-xs font-medium">
                    {{ new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
                  </div>
                </div>
              </div>

              <!-- Content -->
              <div class="p-6 flex-1 flex flex-col relative z-10">
                <!-- Title -->
                <h3 class="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
                  {{ post.title }}
                </h3>

                <!-- Description -->
                <p class="text-sm text-muted mb-4 line-clamp-3 flex-1">
                  {{ post.description }}
                </p>

                <!-- Footer with author and read more -->
                <div class="flex items-center justify-between mt-auto pt-4 border-t border-default">
                  <div class="flex items-center gap-2">
                    <div class="size-6 rounded-full bg-gradient-to-br from-teal-500 to-purple-500" />
                    <span class="text-xs text-muted">{{ post.authors?.[0] || 'Martin Patino' }}</span>
                  </div>

                  <div class="flex items-center gap-1 text-primary-500 text-sm font-medium">
                    <span>Read</span>
                    <UIcon
                      name="i-lucide-arrow-right"
                      class="size-4 transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </Motion>
      </div>

      <!-- View all button -->
      <Motion v-bind="useEntryAnimation({ delay: 0.6 })">
        <div class="mt-12 text-center">
          <UButton
            to="/blog"
            size="lg"
            variant="outline"
            label="View All Articles"
            icon="i-lucide-arrow-right"
            trailing
            class="group"
          >
            <template #trailing>
              <UIcon
                name="i-lucide-arrow-right"
                class="size-5 transition-transform group-hover:translate-x-1"
              />
            </template>
          </UButton>
        </div>
      </Motion>
    </UPageSection>
  </UPage>
</template>
