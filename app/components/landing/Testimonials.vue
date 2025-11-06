<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <UPageSection
    v-if="page.testimonials"
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
        What Clients Say
      </h2>
      <p class="text-center text-(--ui-text-muted) mb-12 max-w-2xl mx-auto">
        Testimonials from amazing people I've had the privilege to work with
      </p>
    </Motion>

    <UCarousel
      v-slot="{ item }"
      :items="page.testimonials"
      :autoplay="{ delay: 5000, pauseOnHover: true }"
      loop
      dots
      :ui="{
        viewport: 'max-w-5xl mx-auto',
        indicators: {
          wrapper: 'mt-8 flex justify-center gap-2',
          base: 'size-2 rounded-full transition-all duration-300',
          inactive: 'bg-neutral-300 dark:bg-neutral-700 hover:bg-primary-400 dark:hover:bg-primary-600',
          active: 'bg-primary-500 dark:bg-primary-500 w-8'
        }
      }"
    >
      <Motion
        :initial="{ opacity: 0, scale: 0.95 }"
        :while-in-view="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 500 }"
        :in-view-options="{ once: false }"
      >
        <div class="relative group px-4 sm:px-8">
          <!-- Glassmorphism card -->
          <div
            class="relative rounded-3xl border border-(--ui-border) bg-gradient-to-br from-(--ui-bg) to-(--ui-bg-elevated) p-8 sm:p-12 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:border-primary-500/50 dark:hover:shadow-primary-500/10"
          >
            <!-- Gradient background effect -->
            <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-500/5 via-transparent to-primary-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <!-- Quote icon -->
            <div class="absolute -top-4 left-8 sm:left-12">
              <div class="size-8 rounded-full bg-primary-500 dark:bg-primary-600 flex items-center justify-center shadow-lg ring-4 ring-(--ui-bg)">
                <UIcon name="i-lucide-quote" class="size-4 text-white" />
              </div>
            </div>

            <!-- Quote content -->
            <div class="relative">
              <blockquote class="text-base sm:text-lg text-(--ui-text) leading-relaxed mb-8 min-h-32">
                "{{ item.quote }}"
              </blockquote>

              <!-- Author info -->
              <div class="flex items-center gap-4 pt-6 border-t border-(--ui-border)">
                <UAvatar
                  v-bind="item.author.avatar"
                  size="lg"
                  class="ring-2 ring-(--ui-border) transition-all duration-300 group-hover:ring-primary-500 group-hover:scale-110"
                />
                <div>
                  <div class="font-semibold text-(--ui-text-highlighted)">
                    {{ item.author.name }}
                  </div>
                  <div class="text-sm text-(--ui-text-muted)">
                    {{ item.author.description }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Decorative elements -->
            <div class="absolute -bottom-2 -right-2 size-24 bg-gradient-to-br from-primary-500/20 to-primary-700/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </Motion>
    </UCarousel>
  </UPageSection>
</template>
