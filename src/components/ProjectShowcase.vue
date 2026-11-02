<script setup>
import { computed, ref, watch } from 'vue'
import { ArrowUpRight } from 'lucide-vue-next'
import TechnologyLabel from './TechnologyLabel.vue'

const props = defineProps({
  project: { type: Object, required: true },
  index: { type: Number, required: true },
})

const imageFailed = ref(false)
watch(() => props.project.imageUrl, () => { imageFailed.value = false })
const primaryUrl = computed(() => props.project.demoUrl || props.project.githubUrl)
const visibleTechnologies = computed(() => props.project.technologies.slice(0, 5))
const remainingTechnologies = computed(() => props.project.technologies.slice(5))
const remainingTechnologyNames = computed(() => remainingTechnologies.value.map(({ name }) => name).join(', '))
const primaryLabel = computed(() =>
  props.project.demoUrl
    ? `Abrir aplicação ${props.project.title} em uma nova aba`
    : `Abrir repositório de ${props.project.title} em uma nova aba`,
)
</script>

<template>
  <article class="project-showcase" :class="{ 'project-showcase--offset': index % 2 === 1 }">
    <component
      :is="primaryUrl ? 'a' : 'div'"
      class="project-media relative block overflow-hidden border border-line"
      :class="{ 'project-media--linked': primaryUrl, 'project-media--empty': !project.imageUrl || imageFailed }"
      :href="primaryUrl || undefined"
      :target="primaryUrl ? '_blank' : undefined"
      :rel="primaryUrl ? 'noopener noreferrer' : undefined"
      :aria-label="primaryUrl ? primaryLabel : undefined"
    >
      <img
        v-if="project.imageUrl && !imageFailed"
        class="block h-auto w-full"
        :src="project.imageUrl"
        :alt="`Prévia do projeto ${project.title}`"
        decoding="async"
        @error="imageFailed = true"
      />
      <div v-else class="flex h-full w-full items-center justify-center p-8 text-center">
        <p class="text-xs tracking-[0.15em] text-accent uppercase">Imagem indisponível</p>
      </div>
      <span v-if="primaryUrl" class="project-open absolute top-4 right-4 flex size-10 items-center justify-center border border-ink/20 bg-paper/90 text-ink sm:top-6 sm:right-6 sm:size-12" aria-hidden="true">
        <ArrowUpRight :size="20" :stroke-width="1.3" />
      </span>
    </component>

    <div class="project-info mt-7 grid gap-8 border-t border-line pt-7 md:mt-10 md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] md:gap-12 md:pt-9">
      <div>
        <p class="mb-4 text-[0.72rem] font-medium tracking-[0.15em] text-accent">{{ String(index + 1).padStart(2, '0') }} / {{ project.year }}</p>
        <h3 class="project-title font-editorial leading-[0.88] tracking-[-0.055em] text-ink">{{ project.title }}</h3>
      </div>

      <div class="flex flex-col items-start gap-7 md:gap-8">
        <p class="max-w-[36rem] text-[1.1rem] leading-[1.7] text-ink sm:text-[1.2rem]">{{ project.summary }}</p>
        <ul v-if="project.technologies.length" class="flex flex-wrap items-center gap-x-6 gap-y-3" aria-label="Tecnologias utilizadas">
          <li v-for="technology in visibleTechnologies" :key="technology.id">
            <TechnologyLabel :technology="technology" />
          </li>
          <li v-if="remainingTechnologies.length" class="text-sm leading-6 text-accent" :title="remainingTechnologyNames">
            +{{ remainingTechnologies.length }}
            <span class="sr-only"> tecnologias adicionais: {{ remainingTechnologyNames }}</span>
          </li>
        </ul>
        <div v-if="project.demoUrl || project.githubUrl" class="flex flex-wrap gap-x-9 gap-y-2 pt-2 text-[0.82rem] font-medium tracking-[0.12em]">
          <a v-if="project.demoUrl" class="interactive-line inline-flex min-h-11 items-center gap-1.5" :href="project.demoUrl" target="_blank" rel="noopener noreferrer">
            LIVE SITE <ArrowUpRight :size="16" :stroke-width="1.5" aria-hidden="true" />
            <span class="sr-only"> de {{ project.title }} (abre em nova aba)</span>
          </a>
          <a v-if="project.githubUrl" class="interactive-line inline-flex min-h-11 items-center gap-1.5" :href="project.githubUrl" target="_blank" rel="noopener noreferrer">
            GITHUB <ArrowUpRight :size="16" :stroke-width="1.5" aria-hidden="true" />
            <span class="sr-only"> de {{ project.title }} (abre em nova aba)</span>
          </a>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.project-showcase--offset { width: 100%; }
.project-media { margin-inline: calc(var(--space-page) / -2); }
.project-media--empty { aspect-ratio: 16 / 10; }
.project-media img { transition: transform 700ms var(--ease-editorial); }
.project-open { transition: transform var(--transition-quiet); }
.project-title { font-size: clamp(3.4rem, 6.8vw, 7rem); overflow-wrap: anywhere; }

@media (min-width: 1024px) {
  .project-showcase--offset { width: 82%; margin-left: auto; }
}

@media (hover: hover) {
  .project-media--linked:hover img { transform: scale(1.025); }
  .project-media--linked:hover .project-open { transform: translate(2px, -2px); }
}

@media (prefers-reduced-motion: reduce) {
  .project-media img, .project-open { transition: none; }
}
</style>
