<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { fetchProjects } from '../services/projects'
import { useScrollReveal } from '../composables/useScrollReveal'
import ProjectShowcase from './ProjectShowcase.vue'

const projects = ref([])
const status = ref('loading')
const errorMessage = ref('')
let requestController
const sectionElement = ref(null)
useScrollReveal(sectionElement)

async function loadProjects() {
  requestController?.abort()
  requestController = new AbortController()
  status.value = 'loading'
  errorMessage.value = ''

  try {
    projects.value = await fetchProjects({ signal: requestController.signal })
    status.value = 'ready'
  } catch (error) {
    if (error.name === 'AbortError') return
    errorMessage.value = error.message || 'Não foi possível carregar os projetos.'
    status.value = 'error'
  }
}

onMounted(loadProjects)
onBeforeUnmount(() => requestController?.abort())
</script>

<template>
  <section id="work" ref="sectionElement" aria-labelledby="work-title" class="page-container w-full scroll-mt-8 pt-20 pb-28 sm:pt-28 md:pt-36 md:pb-40">
    <div data-scroll-reveal class="mb-7 flex items-center gap-5 text-[0.72rem] font-medium tracking-[0.16em] text-accent md:mb-8">
      <span aria-hidden="true" class="h-px w-11 bg-accent md:w-20"></span>
      <p>02 / PROJETOS</p>
    </div>

    <div class="grid items-end gap-6 xl:grid-cols-[minmax(0,1fr)_17rem] xl:gap-8">
      <h2 id="work-title" data-scroll-reveal style="--reveal-delay: 80ms" class="section-title font-editorial leading-[0.82] tracking-[-0.065em] text-ink">
        <span class="block sm:inline">Trabalhos</span>{{ ' ' }}<em class="text-accent">selecionados.</em>
      </h2>
    </div>

    <div class="mt-10 border-t border-line pt-10 md:mt-14 md:pt-14">
      <p v-if="status === 'loading'" role="status" class="state-copy text-base text-accent" aria-live="polite">Carregando projetos…</p>

      <div v-else-if="status === 'error'" role="alert" class="state-copy">
        <p class="font-editorial text-[clamp(2.5rem,5vw,4rem)] leading-none text-ink">Não foi possível carregar os projetos.</p>
        <p class="mt-4 text-sm leading-relaxed text-accent">{{ errorMessage }}</p>
        <button type="button" class="interactive-line mt-7 text-xs font-medium tracking-[0.14em] text-accent" @click="loadProjects">TENTAR NOVAMENTE ↗</button>
      </div>

      <div v-else-if="projects.length === 0" class="state-copy">
        <p class="font-editorial text-[clamp(2.5rem,5vw,4rem)] leading-none text-ink">Projetos em preparação.</p>
        <p class="mt-4 text-sm leading-relaxed text-accent">Novos trabalhos aparecerão aqui em breve.</p>
      </div>

      <div v-else class="flex flex-col gap-20 md:gap-32">
        <ProjectShowcase v-for="(project, index) in projects" :key="project.id ?? index" :project="project" :index="index" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-title { font-size: clamp(4rem, 8.3vw, 8.5rem); }
.state-copy { min-height: clamp(13rem, 28vw, 22rem); }

@media (min-width: 768px) {
  .section-title { white-space: nowrap; }
}

@media (max-width: 639px) {
  .section-title { font-size: clamp(3.7rem, 16.2vw, 5.4rem); }
}
</style>
