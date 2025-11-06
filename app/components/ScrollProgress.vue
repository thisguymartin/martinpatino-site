<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const progress = ref(0)

const updateProgress = () => {
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const scrollTop = window.scrollY

  const scrollableHeight = documentHeight - windowHeight
  const scrollPercentage = (scrollTop / scrollableHeight) * 100

  progress.value = Math.min(Math.max(scrollPercentage, 0), 100)
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true })
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>

<template>
  <div class="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent pointer-events-none">
    <div
      class="h-full bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 transition-all duration-150 ease-out shadow-lg shadow-primary-500/50"
      :style="{ width: `${progress}%` }"
    />
  </div>
</template>
