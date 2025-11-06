<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

const props = defineProps<{
  page: IndexCollectionItem
}>()

const items = computed(() => {
  return props.page.faq?.categories.map((faq) => {
    return {
      label: faq.title,
      key: faq.title.toLowerCase(),
      questions: faq.questions
    }
  })
})

const ui = {
  root: 'flex items-center gap-4 w-full',
  list: 'relative flex bg-transparent dark:bg-transparent gap-2 px-0 mb-8',
  indicator: 'absolute top-[4px] duration-300 ease-out focus:outline-none rounded-xl bg-primary-500/20',
  trigger: 'px-4 py-2.5 rounded-xl hover:bg-(--ui-bg-elevated) data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400 data-[state=inactive]:text-(--ui-text-muted) transition-all duration-300 font-medium',
  label: 'truncate'
}
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
        {{ page.faq.title }}
      </h2>
      <p class="text-center text-(--ui-text-muted) mb-12 max-w-2xl mx-auto">
        {{ page.faq.description }}
      </p>
    </Motion>

    <div class="max-w-4xl mx-auto">
      <UTabs
        :items
        orientation="horizontal"
        :ui
      >
        <template #content="{ item }">
          <UAccordion
            trailing-icon="lucide:plus"
            :items="item.questions"
            :unmount-on-hide="false"
            :ui="{
              item: 'border-none mb-3',
              trigger: 'group px-6 py-4 transform-gpu rounded-2xl border border-(--ui-border) bg-(--ui-bg) will-change-transform hover:bg-(--ui-bg-elevated) hover:border-primary-500/30 hover:shadow-md transition-all duration-300 text-base font-medium',
              trailingIcon: 'group-data-[state=closed]:rotate-0 group-data-[state=open]:rotate-45 transition-transform duration-300 text-base text-primary-500'
            }"
          >
            <template #body="{ item: _item }">
              <div class="px-6 pb-4 pt-2">
                <div class="relative rounded-xl border border-(--ui-border) bg-(--ui-bg-elevated) p-4">
                  <MDC
                    :value="_item.content"
                    unwrap="p"
                    class="text-(--ui-text-muted) leading-relaxed prose prose-sm dark:prose-invert"
                  />
                </div>
              </div>
            </template>
          </UAccordion>
        </template>
      </UTabs>
    </div>
  </UPageSection>
</template>
