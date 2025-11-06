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
</script>

<template>
  <UPageSection
    :ui="{
      container: 'py-16 sm:py-24'
    }"
  >
    <Motion
      :initial="{ opacity: 0, y: 20 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :transition="{ duration: 600, delay: 200 }"
      :in-view-options="{ once: true }"
    >
      <h2 class="text-3xl sm:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent">
        {{ page.blog.title }}
      </h2>
      <p class="text-center text-(--ui-text-muted) mb-12 max-w-2xl mx-auto">
        {{ page.blog.description }}
      </p>
    </Motion>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      <Motion
        v-for="(post, index) in posts"
        :key="index"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 500, delay: 300 + index * 100 }"
        :in-view-options="{ once: true }"
      >
        <ULink
          :to="post.path"
          class="group block h-full"
        >
          <article
            class="relative h-full rounded-2xl border border-(--ui-border) bg-(--ui-bg) overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:border-primary-500/50 dark:hover:shadow-primary-500/10"
          >
            <!-- Gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <!-- Image -->
            <div v-if="post.image" class="relative h-48 overflow-hidden">
              <NuxtImg
                :src="post.image"
                :alt="post.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            <!-- Content -->
            <div class="relative p-6 flex flex-col gap-3">
              <!-- Meta -->
              <div class="flex items-center gap-2 text-xs text-(--ui-text-muted)">
                <time v-if="post.date">{{ new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }}</time>
                <span v-if="post.minRead">•</span>
                <span v-if="post.minRead">{{ post.minRead }} min read</span>
              </div>

              <!-- Title -->
              <h3 class="text-lg font-semibold text-(--ui-text-highlighted) line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {{ post.title }}
              </h3>

              <!-- Description -->
              <p class="text-sm text-(--ui-text-muted) line-clamp-3 flex-1">
                {{ post.description }}
              </p>

              <!-- Read more -->
              <div class="flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 font-medium pt-2">
                <span>Read article</span>
                <UIcon
                  name="i-lucide-arrow-right"
                  class="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </div>

            <!-- External badge -->
            <div v-if="post.external" class="absolute top-4 right-4">
              <div class="px-2 py-1 text-xs font-medium rounded-md bg-primary-500/10 border border-primary-500/20 text-primary-600 dark:text-primary-400 backdrop-blur-sm">
                External
              </div>
            </div>
          </article>
        </ULink>
      </Motion>
    </div>

    <!-- View all blogs link -->
    <Motion
      :initial="{ opacity: 0 }"
      :while-in-view="{ opacity: 1 }"
      :transition="{ duration: 500, delay: 600 }"
      :in-view-options="{ once: true }"
      class="flex justify-center mt-12"
    >
      <UButton
        to="/blog"
        size="lg"
        variant="outline"
        trailing-icon="i-lucide-arrow-right"
        class="group"
      >
        View All Articles
        <template #trailing>
          <UIcon name="i-lucide-arrow-right" class="size-5 transition-transform duration-300 group-hover:translate-x-1" />
        </template>
      </UButton>
    </Motion>
  </UPageSection>
</template>
