<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

const { footer, global } = useAppConfig()

defineProps<{
  page: IndexCollectionItem
}>()

// Animation helpers
const containerAnim = useEntryAnimation({ delay: 0 })
const avatarAnim = useEntryAnimation({ delay: 0.1 })
const titleAnim = useEntryAnimation({ delay: 0.2 })
const descriptionAnim = useEntryAnimation({ delay: 0.3 })
const ctaAnim = useEntryAnimation({ delay: 0.4 })
const statsAnim = useEntryAnimation({ delay: 0.5 })
const marqueeAnim = useEntryAnimation({ delay: 0.6 })
</script>

<template>
  <div class="relative overflow-hidden">
    <!-- Gradient mesh background -->
    <div class="absolute inset-0 gradient-mesh-bg opacity-50" />

    <!-- Animated gradient orbs -->
    <div class="absolute top-0 left-0 w-96 h-96 bg-teal-500/20 dark:bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;" />

    <UPage>
      <UPageHero
        :ui="{
          container: 'py-24 sm:py-32 lg:py-40',
        }"
      >
        <Motion v-bind="containerAnim">
          <!-- Main bento grid layout -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 relative">
            <!-- Left column: Avatar + Title -->
            <div class="lg:col-span-5 space-y-4">
              <!-- Avatar card -->
              <Motion v-bind="avatarAnim">
                <div class="glass-strong rounded-3xl p-6 sm:p-8 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                  <div class="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <div class="flex items-center gap-6 relative z-10">
                    <UColorModeAvatar
                      class="size-20 sm:size-24 ring-4 ring-teal-500/50 dark:ring-teal-400/30 ring-offset-4 ring-offset-transparent hover:ring-teal-500 dark:hover:ring-teal-400 transition-all duration-300 hover:scale-110"
                      :light="global.picture?.light!"
                      :dark="global.picture?.dark!"
                      :alt="global.picture?.alt!"
                    />
                    <div class="flex-1">
                      <h1 class="text-2xl sm:text-3xl font-bold gradient-text">
                        {{ page.title }}
                      </h1>
                      <p class="text-sm sm:text-base text-muted mt-1">
                        Full Stack Developer
                      </p>
                    </div>
                  </div>
                </div>
              </Motion>

              <!-- Description card -->
              <Motion v-bind="descriptionAnim">
                <div class="glass-strong rounded-3xl p-6 sm:p-8 relative overflow-hidden group">
                  <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/20 to-transparent rounded-full blur-2xl" />
                  <p class="text-base sm:text-lg text-default leading-relaxed relative z-10">
                    {{ page.description }}
                  </p>

                  <!-- CTA Buttons -->
                  <div class="flex flex-wrap gap-3 mt-6 relative z-10">
                    <UButton
                      label="Contact Me"
                      :to="`mailto:${global.email}`"
                      size="lg"
                      class="gradient-border"
                      icon="i-lucide-mail"
                    />

                    <UButton
                      :color="global.available ? 'primary' : 'red'"
                      variant="soft"
                      size="lg"
                      class="gap-2"
                      :to="global.available ? global.meetingLink : ''"
                      :label="global.available ? 'Available for projects' : 'Not available'"
                    >
                      <template #leading>
                        <span class="relative flex size-2">
                          <span
                            class="absolute inline-flex size-full rounded-full opacity-75"
                            :class="global.available ? 'bg-primary-500 animate-ping' : 'bg-red-500'"
                          />
                          <span
                            class="relative inline-flex size-2 scale-90 rounded-full"
                            :class="global.available ? 'bg-primary-500' : 'bg-red-500'"
                          />
                        </span>
                      </template>
                    </UButton>
                  </div>

                  <!-- Social Links -->
                  <div class="flex gap-2 mt-4 relative z-10">
                    <UButton
                      v-for="(link, index) of footer?.links"
                      :key="index"
                      v-bind="{ size: 'lg', color: 'neutral', variant: 'ghost', ...link }"
                      class="hover:scale-110 transition-transform"
                    />
                  </div>
                </div>
              </Motion>
            </div>

            <!-- Right column: Stats + Marquee -->
            <div class="lg:col-span-7 space-y-4">
              <!-- Stats grid -->
              <Motion v-bind="statsAnim">
                <div class="grid grid-cols-3 gap-4">
                  <div class="glass-strong rounded-2xl p-4 sm:p-6 text-center hover:scale-105 transition-transform duration-300 relative overflow-hidden group">
                    <div class="absolute inset-0 gradient-accent opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    <div class="text-3xl sm:text-4xl font-bold gradient-text relative z-10">10+</div>
                    <div class="text-xs sm:text-sm text-muted mt-1 relative z-10">Years Exp</div>
                  </div>

                  <div class="glass-strong rounded-2xl p-4 sm:p-6 text-center hover:scale-105 transition-transform duration-300 relative overflow-hidden group">
                    <div class="absolute inset-0 gradient-secondary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    <div class="text-3xl sm:text-4xl font-bold gradient-text relative z-10">50+</div>
                    <div class="text-xs sm:text-sm text-muted mt-1 relative z-10">Projects</div>
                  </div>

                  <div class="glass-strong rounded-2xl p-4 sm:p-6 text-center hover:scale-105 transition-transform duration-300 relative overflow-hidden group">
                    <div class="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    <div class="text-3xl sm:text-4xl font-bold gradient-text relative z-10">∞</div>
                    <div class="text-xs sm:text-sm text-muted mt-1 relative z-10">Coffee Cups</div>
                  </div>
                </div>
              </Motion>

              <!-- Image marquee card -->
              <Motion v-bind="marqueeAnim">
                <div class="glass-strong rounded-3xl p-4 sm:p-6 relative overflow-hidden">
                  <div class="absolute top-0 left-0 w-full h-1 gradient-primary opacity-50" />

                  <h3 class="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
                    Recent Moments
                  </h3>

                  <UMarquee
                    pause-on-hover
                    class="[--duration:40s]"
                  >
                    <div
                      v-for="(img, index) in page.hero.images"
                      :key="index"
                      class="mx-2"
                    >
                      <div class="relative group">
                        <div class="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300 z-10" />
                        <NuxtImg
                          width="234"
                          height="234"
                          class="rounded-xl aspect-square object-cover transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-0 ring-2 ring-default/50 group-hover:ring-teal-500"
                          :class="index % 2 === 0 ? '-rotate-2' : 'rotate-2'"
                          v-bind="img"
                        />
                      </div>
                    </div>
                  </UMarquee>
                </div>
              </Motion>
            </div>
          </div>
        </Motion>
      </UPageHero>
    </UPage>
  </div>
</template>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>
