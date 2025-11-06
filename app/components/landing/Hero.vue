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
      container: 'py-16 sm:py-24 lg:py-32',
    }"
  >
    <Motion v-bind="containerAnim">
      <div class="max-w-5xl mx-auto">
        <!-- Centered intro section -->
        <div class="text-center space-y-8 mb-16">
          <!-- Profile -->
          <Motion v-bind="profileAnim">
            <div class="flex flex-col items-center gap-4">
              <UColorModeAvatar
                class="size-28 sm:size-32 ring-4 ring-primary-500/20 ring-offset-4 ring-offset-(--ui-bg) transition-all duration-300 hover:ring-primary-500/40 hover:scale-105"
                :light="global.picture?.light!"
                :dark="global.picture?.dark!"
                :alt="global.picture?.alt!"
              />
              <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-600 dark:text-primary-400 text-sm font-medium">
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
          </Motion>

          <!-- Title -->
          <Motion v-bind="titleAnim">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight px-4">
              <span class="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent">
                {{ page.title }}
              </span>
            </h1>
          </Motion>

          <!-- Description -->
          <Motion v-bind="descriptionAnim">
            <p class="text-lg sm:text-xl text-(--ui-text-muted) leading-relaxed max-w-3xl mx-auto px-4">
              {{ page.description }}
            </p>
          </Motion>

          <!-- CTAs and Social -->
          <Motion v-bind="linksAnim">
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
              <div class="flex flex-wrap items-center justify-center gap-4">
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
              </div>

              <!-- Social links -->
              <div class="flex items-center gap-2">
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

        <!-- Centered Stats Grid (Bento style) -->
        <Motion v-bind="statsAnim">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4">
            <!-- Years of Experience -->
            <div class="col-span-2 lg:col-span-2 group relative rounded-2xl border border-(--ui-border) bg-gradient-to-br from-(--ui-bg) to-(--ui-bg-elevated) p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary-500/50 dark:hover:shadow-primary-500/10">
              <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div class="relative flex items-center gap-4">
                <div class="size-14 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <UIcon name="i-lucide-briefcase" class="size-7 text-primary-500" />
                </div>
                <div>
                  <div class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted)">5+</div>
                  <div class="text-sm text-(--ui-text-muted)">Years Experience</div>
                </div>
              </div>
            </div>

            <!-- Projects -->
            <div class="group relative rounded-2xl border border-(--ui-border) bg-gradient-to-br from-(--ui-bg) to-(--ui-bg-elevated) p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary-500/50 dark:hover:shadow-primary-500/10">
              <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div class="relative text-center">
                <div class="size-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-3 mx-auto">
                  <UIcon name="i-lucide-code-2" class="size-6 text-primary-500" />
                </div>
                <div class="text-3xl font-bold text-(--ui-text-highlighted) mb-1">50+</div>
                <div class="text-sm text-(--ui-text-muted)">Projects</div>
              </div>
            </div>

            <!-- Clients -->
            <div class="group relative rounded-2xl border border-(--ui-border) bg-gradient-to-br from-(--ui-bg) to-(--ui-bg-elevated) p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary-500/50 dark:hover:shadow-primary-500/10">
              <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div class="relative text-center">
                <div class="size-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-3 mx-auto">
                  <UIcon name="i-lucide-users" class="size-6 text-primary-500" />
                </div>
                <div class="text-3xl font-bold text-(--ui-text-highlighted) mb-1">20+</div>
                <div class="text-sm text-(--ui-text-muted)">Clients</div>
              </div>
            </div>

            <!-- Current Role -->
            <div class="col-span-2 group relative rounded-2xl border border-(--ui-border) bg-gradient-to-br from-primary-500/5 to-(--ui-bg-elevated) p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary-500/50 dark:hover:shadow-primary-500/10">
              <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div class="relative flex items-center gap-4">
                <div class="size-14 rounded-xl bg-primary-500 flex items-center justify-center flex-shrink-0">
                  <UIcon name="i-lucide-award" class="size-7 text-white" />
                </div>
                <div class="flex-1">
                  <div class="font-semibold text-(--ui-text-highlighted) mb-1 text-base sm:text-lg">
                    Senior Software Engineer at Sibi
                  </div>
                  <div class="text-sm text-(--ui-text-muted)">
                    Leading serverless migrations & AI agent development
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Motion>
      </div>
    </Motion>
  </UPageHero>
</template>
