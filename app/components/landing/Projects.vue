<script setup lang="ts">
const { data: projects } = await useAsyncData('projects', () => {
  return queryCollection('projects').limit(4).all()
})
</script>

<template>
  <UPageSection
    v-if="projects && projects.length > 0"
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
        Featured Projects
      </h2>
      <p class="text-center text-(--ui-text-muted) mb-12 max-w-2xl mx-auto">
        A selection of projects I've worked on
      </p>
    </Motion>

    <!-- Bento Grid Layout -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
      <Motion
        v-for="(project, index) in projects"
        :key="index"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 500, delay: 300 + index * 100 }"
        :in-view-options="{ once: true }"
        :class="[
          index === 0 ? 'md:col-span-2' : '',
        ]"
      >
        <ULink
          :to="project.url"
          class="group relative block rounded-2xl overflow-hidden border border-(--ui-border) bg-(--ui-bg) transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-primary-500/50 dark:hover:shadow-primary-500/10"
          :class="[
            index === 0 ? 'md:h-96' : 'h-80'
          ]"
        >
          <!-- Project image with overlay -->
          <div class="relative h-full overflow-hidden">
            <NuxtImg
              :src="project.image"
              :alt="project.title"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <!-- Gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

            <!-- Hover gradient effect -->
            <div class="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-transparent to-primary-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          <!-- Content -->
          <div class="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
              <span
                v-for="(tag, tagIndex) in project.tags"
                :key="tagIndex"
                class="px-3 py-1 text-xs font-medium rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Title and description -->
            <div class="space-y-2">
              <div class="flex items-center justify-between gap-4">
                <h3 class="text-xl sm:text-2xl font-bold text-white transition-transform duration-300 group-hover:translate-x-1">
                  {{ project.title }}
                </h3>
                <div class="flex-shrink-0 size-10 rounded-full bg-primary-500/20 backdrop-blur-sm border border-primary-500/30 flex items-center justify-center transition-all duration-300 group-hover:bg-primary-500 group-hover:scale-110">
                  <UIcon name="i-lucide-arrow-up-right" class="size-5 text-white" />
                </div>
              </div>

              <p class="text-sm sm:text-base text-white/80 line-clamp-2 transition-all duration-300">
                {{ project.description }}
              </p>

              <!-- Date -->
              <p class="text-xs text-white/60 pt-2">
                {{ project.date }}
              </p>
            </div>
          </div>

          <!-- Decorative corner accent -->
          <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-500/30 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </ULink>
      </Motion>
    </div>

    <!-- View all projects link -->
    <Motion
      :initial="{ opacity: 0 }"
      :while-in-view="{ opacity: 1 }"
      :transition="{ duration: 500, delay: 700 }"
      :in-view-options="{ once: true }"
      class="flex justify-center mt-12"
    >
      <UButton
        to="/_projects"
        size="lg"
        variant="outline"
        trailing-icon="i-lucide-arrow-right"
        class="group"
      >
        View All Projects
        <template #trailing>
          <UIcon name="i-lucide-arrow-right" class="size-5 transition-transform duration-300 group-hover:translate-x-1" />
        </template>
      </UButton>
    </Motion>
  </UPageSection>
</template>
