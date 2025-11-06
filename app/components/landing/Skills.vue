<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()

const skills = [
  {
    category: 'Cloud & Serverless',
    color: '#FF9900',
    items: [
      { name: 'AWS Lambda', icon: 'i-simple-icons-awslambda' },
      { name: 'DynamoDB', icon: 'i-simple-icons-amazondynamodb' },
      { name: 'S3', icon: 'i-simple-icons-amazons3' },
      { name: 'EventBridge', icon: 'i-simple-icons-amazonwebservices' },
      { name: 'SQS', icon: 'i-simple-icons-amazonwebservices' },
      { name: 'CloudWatch', icon: 'i-simple-icons-amazonwebservices' }
    ]
  },
  {
    category: 'Frontend',
    color: '#61DAFB',
    items: [
      { name: 'React', icon: 'i-simple-icons-react' },
      { name: 'React Native', icon: 'i-simple-icons-react' },
      { name: 'Vue.js', icon: 'i-simple-icons-vuedotjs' },
      { name: 'Nuxt.js', icon: 'i-simple-icons-nuxtdotjs' },
      { name: 'TypeScript', icon: 'i-simple-icons-typescript' },
      { name: 'Tailwind CSS', icon: 'i-simple-icons-tailwindcss' }
    ]
  },
  {
    category: 'Backend & DevOps',
    color: '#339933',
    items: [
      { name: 'Node.js', icon: 'i-simple-icons-nodedotjs' },
      { name: 'Docker', icon: 'i-simple-icons-docker' },
      { name: 'Java', icon: 'i-simple-icons-openjdk' },
      { name: 'SpringBoot', icon: 'i-simple-icons-springboot' },
      { name: 'RabbitMQ', icon: 'i-simple-icons-rabbitmq' }
    ]
  },
  {
    category: 'AI & Modern Tools',
    color: '#10A37F',
    items: [
      { name: 'AI Agents', icon: 'i-lucide-brain-circuit' },
      { name: 'MCP Servers', icon: 'i-lucide-server' },
      { name: 'CI/CD', icon: 'i-lucide-git-branch' },
      { name: 'Agile/SCRUM', icon: 'i-lucide-kanban-square' }
    ]
  }
]
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
        Skills & Technologies
      </h2>
      <p class="text-center text-(--ui-text-muted) mb-12 max-w-2xl mx-auto">
        Technologies and tools I use to build scalable, user-centric solutions
      </p>
    </Motion>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
      <Motion
        v-for="(skillGroup, groupIndex) in skills"
        :key="groupIndex"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 500, delay: 300 + groupIndex * 100 }"
        :in-view-options="{ once: true }"
      >
        <div class="group relative rounded-2xl border border-(--ui-border) bg-(--ui-bg) p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary-500/50 dark:hover:shadow-primary-500/10">
          <!-- Gradient overlay -->
          <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <!-- Category header -->
          <div class="relative flex items-center gap-3 mb-4 pb-4 border-b border-(--ui-border)">
            <div
              class="size-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              :style="{ backgroundColor: skillGroup.color + '20' }"
            >
              <div
                class="size-2 rounded-full"
                :style="{ backgroundColor: skillGroup.color }"
              />
            </div>
            <h3
              class="text-lg font-semibold transition-colors duration-300"
              :style="{ color: skillGroup.color }"
            >
              {{ skillGroup.category }}
            </h3>
          </div>

          <!-- Skills grid -->
          <div class="relative flex flex-wrap gap-2">
            <Motion
              v-for="(skill, skillIndex) in skillGroup.items"
              :key="skillIndex"
              :initial="{ opacity: 0, scale: 0.8 }"
              :while-in-view="{ opacity: 1, scale: 1 }"
              :transition="{ duration: 300, delay: 400 + groupIndex * 100 + skillIndex * 50 }"
              :in-view-options="{ once: true }"
            >
              <div
                class="group/skill flex items-center gap-2 px-3 py-2 rounded-lg bg-(--ui-bg-elevated) border border-(--ui-border) transition-all duration-300 hover:scale-105 hover:shadow-md cursor-default"
                :class="[
                  'hover:border-primary-500/50'
                ]"
              >
                <UIcon
                  :name="skill.icon"
                  class="size-4 transition-all duration-300 group-hover/skill:scale-110"
                  :style="{ color: skillGroup.color }"
                />
                <span class="text-sm font-medium text-(--ui-text)">
                  {{ skill.name }}
                </span>
              </div>
            </Motion>
          </div>
        </div>
      </Motion>
    </div>
  </UPageSection>
</template>
