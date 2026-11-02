<script setup>
import { computed, ref, watch } from 'vue'
import { Code2 } from 'lucide-vue-next'

const props = defineProps({
  technology: { type: Object, required: true },
})

const imageFailed = ref(false)

const iconUrl = computed(() => {
  const identifier = typeof props.technology.icon === 'string'
    ? props.technology.icon.trim().toLowerCase()
    : ''
  const match = identifier?.match(/^([a-z0-9]+(?:-[a-z0-9]+)*)-(?:original|plain|line)(?:-wordmark)?$/)

  if (!match) return null
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.18.0/icons/${match[1]}/${identifier}.svg`
})

watch(iconUrl, () => { imageFailed.value = false })
</script>

<template>
  <span class="inline-flex min-w-0 items-center gap-2.5 text-sm leading-6 text-ink">
    <img
      v-if="iconUrl && !imageFailed"
      :src="iconUrl"
      alt=""
      aria-hidden="true"
      class="size-5 shrink-0 object-contain"
      width="20"
      height="20"
      loading="lazy"
      decoding="async"
      @error="imageFailed = true"
    />
    <Code2 v-else :size="20" :stroke-width="1.4" class="shrink-0 text-accent" aria-hidden="true" />
    <span>{{ technology.name }}</span>
  </span>
</template>
