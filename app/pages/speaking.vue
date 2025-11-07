<script setup lang="ts">
type Event = {
  title: string
  date: string
  location: string
  url?: string
  category: 'Conference' | 'Live talk' | 'Podcast'
}

const { data: page } = await useAsyncData('speaking', () => {
  return queryCollection('speaking').first()
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

const { global } = useAppConfig()

const groupedEvents = computed((): Record<Event['category'], Event[]> => {
  const events = page.value?.events || []
  const grouped: Record<Event['category'], Event[]> = {
    'Conference': [],
    'Live talk': [],
    'Podcast': []
  }
  for (const event of events) {
    if (grouped[event.category]) grouped[event.category].push(event)
  }
  return grouped
})

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
}

const categoryIcons = {
  'Conference': 'i-lucide-presentation',
  'Live talk': 'i-lucide-mic',
  'Podcast': 'i-lucide-podcast'
}

const categoryColors = {
  'Conference': 'from-teal-500 to-cyan-500',
  'Live talk': 'from-purple-500 to-pink-500',
  'Podcast': 'from-blue-500 to-indigo-500'
}

// Animation helpers
const heroAnim = useEntryAnimation({ delay: 0.1 })
const sectionAnim = (index: number) => useEntryAnimation({ delay: 0.2 + index * 0.1 })
</script>

<template>
  <div v-if="page" class="relative overflow-hidden">
    <!-- Gradient mesh background -->
    <div class="absolute inset-0 gradient-mesh-bg opacity-30" />

    <UPage>
      <!-- Hero Section -->
      <Motion v-bind="heroAnim">
        <UPageHero
          :ui="{
            container: 'py-24 sm:py-32',
          }"
        >
          <div class="text-center max-w-3xl mx-auto">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold">
              <span class="gradient-text">{{ page.title }}</span>
            </h1>
            <p class="mt-6 text-lg sm:text-xl text-muted leading-relaxed">
              {{ page.description }}
            </p>

            <div v-if="page.links" class="mt-8">
              <UButton
                :to="`mailto:${global.email}`"
                v-bind="page.links[0]"
                size="lg"
                class="gradient-border"
              />
            </div>
          </div>
        </UPageHero>
      </Motion>

      <!-- Events Section -->
      <UPageSection
        :ui="{
          container: 'py-16 sm:py-24',
        }"
      >
        <div class="space-y-16">
          <Motion
            v-for="(eventsInCategory, category, categoryIndex) in groupedEvents"
            :key="category"
            v-bind="sectionAnim(categoryIndex)"
          >
            <div v-if="eventsInCategory.length > 0" class="glass-strong rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <!-- Category header with icon -->
              <div class="flex items-center gap-4 mb-8 pb-6 border-b border-default">
                <div :class="`size-12 rounded-xl bg-gradient-to-br ${categoryColors[category as Event['category']]} flex items-center justify-center`">
                  <UIcon
                    :name="categoryIcons[category as Event['category']]"
                    class="size-6 text-white"
                  />
                </div>
                <h2 class="text-2xl sm:text-3xl font-bold gradient-text">
                  {{ category.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()) }}s
                </h2>
              </div>

              <!-- Timeline -->
              <div class="space-y-6">
                <Motion
                  v-for="(event, index) in eventsInCategory"
                  :key="`${category}-${index}`"
                  v-bind="useEntryAnimation({ delay: 0.3 + categoryIndex * 0.1 + index * 0.05 })"
                >
                  <div class="group relative pl-8 border-l-2 border-primary-500/30 hover:border-primary-500 transition-colors">
                    <!-- Timeline dot -->
                    <div class="absolute -left-[9px] top-0 size-4 rounded-full bg-primary-500/30 group-hover:bg-primary-500 transition-all group-hover:scale-125 ring-4 ring-default" />

                    <NuxtLink
                      v-if="event.url"
                      :to="event.url"
                      target="_blank"
                      class="block hover:translate-x-1 transition-transform duration-300"
                    >
                      <div class="glass rounded-xl p-4 hover:glass-strong transition-all">
                        <!-- Date and location -->
                        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs sm:text-sm text-muted">
                          <div class="flex items-center gap-1">
                            <UIcon name="i-lucide-calendar" class="size-4" />
                            <span v-if="event.date">{{ formatDate(event.date) }}</span>
                          </div>
                          <span v-if="event.location && event.date">·</span>
                          <div v-if="event.location" class="flex items-center gap-1">
                            <UIcon name="i-lucide-map-pin" class="size-4" />
                            <span>{{ event.location }}</span>
                          </div>
                        </div>

                        <!-- Title -->
                        <h3 class="text-base sm:text-lg font-semibold mb-2 group-hover:text-primary-500 transition-colors">
                          {{ event.title }}
                        </h3>

                        <!-- CTA -->
                        <div class="flex items-center gap-1 text-primary-500 text-sm font-medium">
                          <span>{{ event.category === 'Podcast' ? 'Listen' : 'Watch' }}</span>
                          <UIcon
                            name="i-lucide-arrow-right"
                            class="size-4 transition-transform group-hover:translate-x-1"
                          />
                        </div>
                      </div>
                    </NuxtLink>

                    <!-- Non-link event -->
                    <div v-else class="glass rounded-xl p-4">
                      <!-- Date and location -->
                      <div class="flex flex-wrap items-center gap-2 mb-2 text-xs sm:text-sm text-muted">
                        <div class="flex items-center gap-1">
                          <UIcon name="i-lucide-calendar" class="size-4" />
                          <span v-if="event.date">{{ formatDate(event.date) }}</span>
                        </div>
                        <span v-if="event.location && event.date">·</span>
                        <div v-if="event.location" class="flex items-center gap-1">
                          <UIcon name="i-lucide-map-pin" class="size-4" />
                          <span>{{ event.location }}</span>
                        </div>
                      </div>

                      <!-- Title -->
                      <h3 class="text-base sm:text-lg font-semibold">
                        {{ event.title }}
                      </h3>
                    </div>
                  </div>
                </Motion>
              </div>
            </div>
          </Motion>
        </div>

        <!-- Empty state -->
        <div v-if="!page.events || page.events.length === 0" class="text-center py-12">
          <UIcon name="i-lucide-presentation" class="size-16 text-muted mx-auto mb-4" />
          <p class="text-muted">No speaking events found.</p>
        </div>
      </UPageSection>
    </UPage>
  </div>
</template>
