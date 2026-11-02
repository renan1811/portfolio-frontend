<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { fetchProjects } from '../services/projects'
import ProjectShowcase from './ProjectShowcase.vue'

const projects = ref([])
const status = ref('loading')
const errorMessage = ref('')
let requestController

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
  <section id="work" aria-labelledby="work-title" class="page-container w-full scroll-mt-8 pt-24 pb-32 sm:pt-32 md:pt-40 md:pb-44">
    <div class="mb-8 flex items-center gap-5 text-[0.72rem] font-medium tracking-[0.16em] text-accent md:mb-10">
      <span aria-hidden="true" class="h-px w-11 bg-accent md:w-20"></span>
      <p>02 / SELECTED WORK</p>
    </div>

    <div class="grid items-end gap-6 xl:grid-cols-[minmax(0,1fr)_17rem] xl:gap-8">
      <h2 id="work-title" class="section-title font-editorial leading-[0.82] tracking-[-0.065em] text-ink">
        <span class="block sm:inline">Selected</span>{{ ' ' }}<em class="text-accent">Work.</em>
      </h2>
      <p class="max-w-[24rem] text-[1.15rem] leading-[1.45] text-accent md:text-[1.3rem] xl:mb-2">A collection of things I've built.</p>
    </div>

    <div class="mt-12 border-t border-line pt-12 md:mt-16 md:pt-16">
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

      <div v-else class="flex flex-col gap-24 md:gap-36">
        <ProjectShowcase v-for="(project, index) in projects" :key="project.id ?? index" :project="project" :index="index" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-title { font-size: clamp(4.5rem, 9.5vw, 9.5rem); }
.state-copy { min-height: clamp(13rem, 28vw, 22rem); }

@media (min-width: 640px) {
  .section-title { white-space: nowrap; }
}

@media (max-width: 639px) {
  .section-title { font-size: clamp(4.1rem, 18vw, 6rem); }
}
</style>
