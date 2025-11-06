<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

const { footer, global } = useAppConfig()

defineProps<{
  page: IndexCollectionItem
}>()

// Animation helpers
const containerAnim = useEntryAnimation({ delay: 0 })
const profileAnim = useEntryAnimation({ delay: 0.1 })
const titleAnim = useEntryAnimation({ delay: 0.2 })
const descriptionAnim = useEntryAnimation({ delay: 0.3 })
const linksAnim = useEntryAnimation({ delay: 0.4 })
const statsAnim = useEntryAnimation({ delay: 0.5 })
</script>

<template>
  <UPageHero
    :ui="{
      container: 'py-24 sm:py-32 lg:py-40',
    }"
  >
    <Motion v-bind="containerAnim">
      <div class="max-w-7xl mx-auto">
        <!-- Main content grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <!-- Left column - Main intro -->
          <div class="lg:col-span-7 space-y-8">
            <!-- Profile and intro -->
            <div class="space-y-6">
              <Motion v-bind="profileAnim">
                <div class="flex items-center gap-4">
                  <UColorModeAvatar
                    class="size-20 sm:size-24 ring-4 ring-primary-500/20 ring-offset-4 ring-offset-(--ui-bg) transition-all duration-300 hover:ring-primary-500/40 hover:scale-105"
                    :light="global.picture?.light!"
                    :dark="global.picture?.dark!"
                    :alt="global.picture?.alt!"
                  />
                  <div>
                    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-600 dark:text-primary-400 text-sm font-medium mb-2">
                      <span class="relative flex size-2">
                        <span
                          class="absolute inline-flex size-full rounded-full opacity-75"
                          :class="global.available ? 'bg-success animate-ping' : 'bg-error'"
                        />
                        <span
                          class="relative inline-flex size-2 scale-90 rounded-full"
                          :class="global.available ? 'bg-success' : 'bg-error'"
                        />
                      </span>
                      {{ global.available ? 'Available for projects' : 'Not available' }}
                    </div>
                  </div>
                </div>
              </Motion>

              <Motion v-bind="titleAnim">
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                  <span class="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent">
                    {{ page.title }}
                  </span>
                </h1>
              </Motion>

              <Motion v-bind="descriptionAnim">
                <p class="text-lg sm:text-xl text-(--ui-text-muted) leading-relaxed max-w-2xl">
                  {{ page.description }}
                </p>
              </Motion>

              <Motion v-bind="linksAnim">
                <div class="flex flex-wrap items-center gap-4">
                  <UButton
                    label="Contact Me"
                    :to="`mailto:${global.email}`"
                    size="lg"
                    color="primary"
                    icon="i-lucide-mail"
                    class="shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300"
                  />

                  <UButton
                    v-if="global.available && global.meetingLink"
                    label="Schedule a Call"
                    :to="global.meetingLink"
                    size="lg"
                    variant="outline"
                    icon="i-lucide-calendar"
                    target="_blank"
                  />

                  <!-- Social links -->
                  <div class="flex items-center gap-2 ml-4">
                    <UButton
                      v-for="(link, index) of footer?.links"
                      :key="index"
                      v-bind="{ size: 'lg', color: 'neutral', variant: 'ghost', ...link }"
                      class="hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
              </Motion>
            </div>
          </div>

          <!-- Right column - Stats cards (Bento style) -->
          <div class="lg:col-span-5 grid grid-cols-2 gap-4">
            <Motion
              v-bind="statsAnim"
              class="col-span-2"
            >
              <div class="group relative rounded-2xl border border-(--ui-border) bg-gradient-to-br from-(--ui-bg) to-(--ui-bg-elevated) p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary-500/50">
                <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div class="relative">
                  <div class="size-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-3">
                    <UIcon name="i-lucide-briefcase" class="size-6 text-primary-500" />
                  </div>
                  <div class="text-3xl font-bold text-(--ui-text-highlighted) mb-1">5+</div>
                  <div class="text-sm text-(--ui-text-muted)">Years of Experience</div>
                </div>
              </div>
            </Motion>

            <Motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 600 } }"
              :delay="100"
            >
              <div class="group relative rounded-2xl border border-(--ui-border) bg-gradient-to-br from-(--ui-bg) to-(--ui-bg-elevated) p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary-500/50">
                <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div class="relative">
                  <div class="size-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-3">
                    <UIcon name="i-lucide-code-2" class="size-6 text-primary-500" />
                  </div>
                  <div class="text-3xl font-bold text-(--ui-text-highlighted) mb-1">50+</div>
                  <div class="text-sm text-(--ui-text-muted)">Projects Completed</div>
                </div>
              </div>
            </Motion>

            <Motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 700 } }"
              :delay="100"
            >
              <div class="group relative rounded-2xl border border-(--ui-border) bg-gradient-to-br from-(--ui-bg) to-(--ui-bg-elevated) p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary-500/50">
                <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div class="relative">
                  <div class="size-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-3">
                    <UIcon name="i-lucide-users" class="size-6 text-primary-500" />
                  </div>
                  <div class="text-3xl font-bold text-(--ui-text-highlighted) mb-1">20+</div>
                  <div class="text-sm text-(--ui-text-muted)">Happy Clients</div>
                </div>
              </div>
            </Motion>

            <Motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 800 } }"
              :delay="100"
              class="col-span-2"
            >
              <div class="group relative rounded-2xl border border-(--ui-border) bg-gradient-to-br from-primary-500/5 to-(--ui-bg-elevated) p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary-500/50">
                <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div class="relative flex items-center gap-4">
                  <div class="size-12 rounded-xl bg-primary-500 flex items-center justify-center flex-shrink-0">
                    <UIcon name="i-lucide-award" class="size-6 text-white" />
                  </div>
                  <div class="flex-1">
                    <div class="font-semibold text-(--ui-text-highlighted) mb-1">
                      Senior Software Engineer at Sibi
                    </div>
                    <div class="text-sm text-(--ui-text-muted)">
                      Leading serverless migrations & AI agent development
                    </div>
                  </div>
                </div>
              </div>
            </Motion>
          </div>
        </div>
      </div>
    </Motion>
  </UPageHero>
</template>
