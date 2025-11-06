<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <UPageSection
    v-if="page.experience"
    :ui="{
      container: 'py-16 sm:py-24',
    }"
  >
    <Motion
      :initial="{ opacity: 0, y: 20 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :transition="{ duration: 600, delay: 200 }"
      :in-view-options="{ once: true }"
    >
      <h2 class="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent">
        {{ page.experience.title }}
      </h2>
    </Motion>

    <div class="relative max-w-4xl mx-auto">
      <!-- Timeline line -->
      <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500/50 via-primary-500/30 to-transparent hidden sm:block" />

      <div class="space-y-8">
        <Motion
          v-for="(item, index) in page.experience.items"
          :key="index"
          :initial="{ opacity: 0, x: -20 }"
          :while-in-view="{
            opacity: 1,
            x: 0
          }"
          :transition="{
            duration: 500,
            delay: 300 + index * 100
          }"
          :in-view-options="{ once: true }"
        >
          <div
            class="relative group sm:pl-24"
          >
            <!-- Timeline dot -->
            <div class="absolute left-8 top-6 -translate-x-1/2 hidden sm:block">
              <div class="relative">
                <div
                  class="size-4 rounded-full ring-4 ring-(--ui-bg) transition-all duration-300 group-hover:scale-125"
                  :style="{ backgroundColor: item.company.color || 'var(--ui-primary)' }"
                />
                <div
                  class="absolute inset-0 size-4 rounded-full animate-ping opacity-0 group-hover:opacity-75 transition-opacity"
                  :style="{ backgroundColor: item.company.color || 'var(--ui-primary)' }"
                />
              </div>
            </div>

            <!-- Experience card -->
            <div
              class="relative rounded-2xl border border-(--ui-border) bg-(--ui-bg) p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary-500/50 dark:hover:shadow-primary-500/10"
            >
              <!-- Gradient overlay on hover -->
              <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div class="relative flex items-start gap-4">
                <!-- Company logo -->
                <div
                  class="flex-shrink-0 size-12 rounded-xl flex items-center justify-center ring-2 ring-(--ui-border) transition-all duration-300 group-hover:scale-110 group-hover:ring-offset-2"
                  :style="{ backgroundColor: item.company.color + '20' || 'var(--ui-primary-50)' }"
                >
                  <UIcon
                    :name="item.company.logo"
                    class="size-6"
                    :style="{ color: item.company.color || 'var(--ui-primary)' }"
                  />
                </div>

                <!-- Content -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 class="text-lg font-semibold text-(--ui-text-highlighted)">
                        {{ item.position }}
                        <UButton
                          v-if="item.company.url !== '#'"
                          :to="item.company.url"
                          variant="link"
                          size="lg"
                          :style="{ color: item.company.color }"
                          class="font-semibold hover:underline"
                          target="_blank"
                        >
                          {{ item.company.name }}
                        </UButton>
                        <span v-else class="font-semibold" :style="{ color: item.company.color }">
                          {{ item.company.name }}
                        </span>
                      </h3>
                    </div>
                    <time class="text-sm text-(--ui-text-muted) whitespace-nowrap">
                      {{ item.date }}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Motion>
      </div>
    </div>
  </UPageSection>
</template>
