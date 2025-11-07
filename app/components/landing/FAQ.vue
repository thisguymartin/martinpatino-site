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
  list: 'relative flex bg-transparent dark:bg-transparent gap-3 px-0 flex-wrap',
  indicator: 'absolute top-[4px] duration-200 ease-out focus:outline-none rounded-xl glass-strong',
  trigger: 'px-4 py-2.5 rounded-xl font-medium transition-all data-[state=active]:text-primary-500 data-[state=inactive]:text-muted hover:bg-muted/30',
  label: 'truncate text-sm sm:text-base'
}

// Animation helpers
const titleAnim = useEntryAnimation({ delay: 0.1 })
const tabsAnim = useEntryAnimation({ delay: 0.2 })
</script>

<template>
  <UPage>
    <UPageSection
      :ui="{
        container: 'py-16 sm:py-24',
      }"
    >
      <!-- Section Header -->
      <Motion v-bind="titleAnim">
        <div class="mb-12 text-center">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span class="gradient-text">{{ page.faq.title }}</span>
          </h2>
          <p class="mt-4 text-base sm:text-lg text-muted max-w-2xl mx-auto">
            {{ page.faq.description }}
          </p>
        </div>
      </Motion>

      <Motion v-bind="tabsAnim">
        <div class="glass-strong rounded-3xl p-6 sm:p-8">
          <UTabs
            :items
            orientation="horizontal"
            :ui
          >
            <template #content="{ item }">
              <div class="mt-6 space-y-3">
                <Motion
                  v-for="(question, index) in item.questions"
                  :key="index"
                  v-bind="useEntryAnimation({ delay: 0.3 + index * 0.05 })"
                >
                  <UAccordion
                    :items="[question]"
                    :unmount-on-hide="false"
                    :ui="{
                      item: 'border-none',
                      trigger: 'group px-6 py-4 transform-gpu rounded-xl glass hover:glass-strong transition-all will-change-transform hover:scale-[1.01] text-base sm:text-lg font-medium',
                      trailingIcon: 'group-data-[state=closed]:rotate-0 group-data-[state=open]:rotate-45 text-lg text-primary-500 transition-transform duration-300',
                      content: 'px-6 pb-4'
                    }"
                    trailing-icon="lucide:plus"
                  >
                    <template #trigger="{ item: _item, open }">
                      <div class="flex items-center gap-3 w-full">
                        <!-- Icon indicator -->
                        <div
                          class="flex-shrink-0 size-8 rounded-lg flex items-center justify-center transition-all duration-300"
                          :class="open ? 'bg-primary-500/20' : 'bg-muted/30'"
                        >
                          <UIcon
                            name="i-lucide-help-circle"
                            :class="open ? 'text-primary-500' : 'text-muted'"
                            class="size-5 transition-colors"
                          />
                        </div>

                        <!-- Question text -->
                        <span
                          class="flex-1 text-left transition-colors"
                          :class="open ? 'text-primary-500' : 'text-default'"
                        >
                          {{ _item.title }}
                        </span>
                      </div>
                    </template>

                    <template #body="{ item: _item }">
                      <div class="ml-11 text-muted leading-relaxed">
                        <MDC
                          :value="_item.content"
                          unwrap="p"
                        />
                      </div>
                    </template>
                  </UAccordion>
                </Motion>
              </div>
            </template>
          </UTabs>
        </div>
      </Motion>

      <!-- Additional help CTA -->
      <Motion v-bind="useEntryAnimation({ delay: 0.6 })">
        <div class="mt-12 text-center">
          <div class="glass-strong rounded-2xl p-8 inline-block">
            <h3 class="text-xl font-bold mb-2">Still have questions?</h3>
            <p class="text-muted mb-4">Feel free to reach out and I'll be happy to help!</p>
            <UButton
              label="Get in Touch"
              icon="i-lucide-message-circle"
              size="lg"
              :to="`mailto:${useAppConfig().global.email}`"
            />
          </div>
        </div>
      </Motion>
    </UPageSection>
  </UPage>
</template>
