<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

defineProps<{
  links: NavigationMenuItem[]
}>()
</script>

<template>
  <div class="fixed top-4 sm:top-6 mx-auto left-1/2 transform -translate-x-1/2 z-50">
    <div class="glass-strong rounded-full px-2 sm:px-4 py-2 shadow-xl shadow-black/10 dark:shadow-black/30 border border-white/20 dark:border-white/10 hover:border-primary-500/30 transition-all duration-300 group">
      <!-- Animated gradient border effect on hover -->
      <div class="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div class="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500/20 via-purple-500/20 to-teal-500/20 blur-sm" />
      </div>

      <UNavigationMenu
        :items="links"
        variant="link"
        color="neutral"
        class="relative z-10 bg-transparent"
        :ui="{
          link: 'px-4 py-2 rounded-full font-medium transition-all hover:bg-primary-500/10 hover:text-primary-500',
          linkLeadingIcon: 'hidden',
          linkActive: 'bg-primary-500/20 text-primary-500'
        }"
      >
        <template #list-trailing>
          <div class="ml-2 pl-2 border-l border-default/50">
            <ColorModeButton />
          </div>
        </template>
      </UNavigationMenu>
    </div>
  </div>
</template>
