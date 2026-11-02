<script setup>
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { fetchExperiences, fetchFormations, fetchTechnologies } from '../services/experience'
import TechnologyLabel from './TechnologyLabel.vue'

const sectionElement = ref(null)
const isVisible = ref(false)
const experiences = reactive({ status: 'loading', items: [] })
const formations = reactive({ status: 'loading', items: [] })
const technologies = reactive({ status: 'loading', items: [] })
const controllers = new Map()
let observer

async function loadResource(key, state, fetcher) {
  controllers.get(key)?.abort()
  const controller = new AbortController()
  controllers.set(key, controller)
  state.status = 'loading'

  try {
    state.items = await fetcher({ signal: controller.signal })
    state.status = 'ready'
  } catch (error) {
    if (error.name !== 'AbortError') {
      state.items = []
      state.status = 'error'
    }
  } finally {
    if (controllers.get(key) === controller) controllers.delete(key)
  }
}

function loadExperiences() { return loadResource('experiences', experiences, fetchExperiences) }
function loadFormations() { return loadResource('formations', formations, fetchFormations) }
function loadTechnologies() { return loadResource('technologies', technologies, fetchTechnologies) }

onMounted(() => {
  loadExperiences()
  loadFormations()
  loadTechnologies()

  if (!('IntersectionObserver' in window)) {
    isVisible.value = true
    return
  }

  observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return
    isVisible.value = true
    observer.disconnect()
  }, { threshold: 0 })
  observer.observe(sectionElement.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  controllers.forEach((controller) => controller.abort())
})
</script>

<template>
  <section
    id="experience"
    ref="sectionElement"
    aria-labelledby="experience-title"
    class="page-container w-full scroll-mt-8 pb-32 pt-24 md:pb-44 md:pt-36"
    :class="{ 'is-visible': isVisible }"
  >
    <div class="experience-reveal mb-8 flex items-center gap-5 text-[0.72rem] font-medium tracking-[0.16em] text-accent md:mb-10">
      <span aria-hidden="true" class="h-px w-11 bg-accent md:w-20"></span>
      <p>04 / EXPERIENCE &amp; SKILLS</p>
    </div>

    <h2 id="experience-title" class="experience-title experience-reveal font-editorial leading-[0.82] tracking-[-0.065em] text-ink">
      Experiência e <em class="text-accent">tecnologias.</em>
    </h2>

    <div class="experience-reveal mt-12 border-t border-line pt-12 md:mt-16 md:pt-16">
      <section aria-labelledby="experiences-heading">
        <h3 id="experiences-heading" class="mb-7 text-[0.72rem] font-medium tracking-[0.16em] text-accent md:mb-9">EXPERIÊNCIAS</h3>

        <p v-if="experiences.status === 'loading'" role="status" aria-live="polite" class="py-8 text-sm text-accent">Carregando experiências…</p>
        <div v-else-if="experiences.status === 'error'" role="alert" class="border-t border-line py-8">
          <p class="text-base text-ink">Não foi possível carregar as experiências.</p>
          <button type="button" class="interactive-line mt-4 text-xs font-medium tracking-[0.14em] text-accent" @click="loadExperiences">TENTAR NOVAMENTE ↗</button>
        </div>
        <p v-else-if="experiences.items.length === 0" class="border-t border-line py-8 text-sm text-accent">Nenhuma experiência publicada no momento.</p>
        <ol v-else class="border-t border-line">
          <li
            v-for="(item, index) in experiences.items"
            :key="item.id ?? index"
            class="experience-row grid min-w-0 gap-x-8 gap-y-3 border-b border-line py-7 md:py-9 lg:grid-cols-[minmax(7rem,0.18fr)_minmax(0,0.34fr)_minmax(0,0.48fr)] lg:gap-x-12"
          >
            <p class="pt-1 text-xs font-medium tracking-[0.1em] text-accent">{{ item.period }}</p>
            <div class="min-w-0">
              <h4 class="font-editorial text-[clamp(2rem,3.2vw,3rem)] leading-[0.98] text-ink">{{ item.title }}</h4>
              <p v-if="item.organization" class="mt-2 text-sm leading-relaxed text-accent">{{ item.organization }}</p>
            </div>
            <div v-if="item.description || item.type" class="min-w-0 lg:pt-1">
              <p v-if="item.description" class="max-w-[37rem] text-[0.95rem] leading-[1.65] text-ink">{{ item.description }}</p>
              <p v-if="item.type" class="mt-3 text-[0.7rem] font-medium tracking-[0.13em] text-accent uppercase">{{ item.type }}</p>
            </div>
          </li>
        </ol>
      </section>

      <section aria-labelledby="formations-heading" class="mt-20 md:mt-28">
        <h3 id="formations-heading" class="mb-7 text-[0.72rem] font-medium tracking-[0.16em] text-accent md:mb-9">FORMAÇÃO</h3>

        <p v-if="formations.status === 'loading'" role="status" aria-live="polite" class="py-8 text-sm text-accent">Carregando formações…</p>
        <div v-else-if="formations.status === 'error'" role="alert" class="border-t border-line py-8">
          <p class="text-base text-ink">Não foi possível carregar as formações.</p>
          <button type="button" class="interactive-line mt-4 text-xs font-medium tracking-[0.14em] text-accent" @click="loadFormations">TENTAR NOVAMENTE ↗</button>
        </div>
        <p v-else-if="formations.items.length === 0" class="border-t border-line py-8 text-sm text-accent">Nenhuma formação publicada no momento.</p>
        <ol v-else class="border-t border-line">
          <li
            v-for="(item, index) in formations.items"
            :key="item.id ?? index"
            class="grid min-w-0 gap-x-8 gap-y-3 border-b border-line py-7 md:py-8 lg:grid-cols-[minmax(7rem,0.18fr)_minmax(0,0.43fr)_minmax(0,0.39fr)] lg:gap-x-12"
          >
            <p class="pt-1 text-xs font-medium tracking-[0.1em] text-accent">{{ item.period }}</p>
            <div class="min-w-0">
              <h4 class="font-editorial text-[clamp(1.85rem,2.8vw,2.65rem)] leading-[1.02] text-ink">{{ item.course }}</h4>
              <p v-if="item.institution" class="mt-2 text-sm leading-relaxed text-accent">{{ item.institution }}</p>
            </div>
            <div v-if="item.description || item.status" class="min-w-0 lg:pt-1">
              <p v-if="item.description" class="max-w-[33rem] text-[0.95rem] leading-[1.65] text-ink">{{ item.description }}</p>
              <p v-if="item.status" class="mt-3 text-[0.7rem] font-medium tracking-[0.13em] text-accent uppercase">{{ item.status }}</p>
            </div>
          </li>
        </ol>
      </section>

      <section aria-labelledby="technologies-heading" class="mt-20 md:mt-28">
        <h3 id="technologies-heading" class="mb-7 text-[0.72rem] font-medium tracking-[0.16em] text-accent md:mb-9">TECNOLOGIAS</h3>

        <p v-if="technologies.status === 'loading'" role="status" aria-live="polite" class="py-8 text-sm text-accent">Carregando tecnologias…</p>
        <div v-else-if="technologies.status === 'error'" role="alert" class="border-t border-line py-8">
          <p class="text-base text-ink">Não foi possível carregar as tecnologias.</p>
          <button type="button" class="interactive-line mt-4 text-xs font-medium tracking-[0.14em] text-accent" @click="loadTechnologies">TENTAR NOVAMENTE ↗</button>
        </div>
        <p v-else-if="technologies.items.length === 0" class="border-t border-line py-8 text-sm text-accent">Nenhuma tecnologia publicada no momento.</p>
        <ul v-else class="grid grid-cols-2 gap-x-6 border-t border-line sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-10">
          <li v-for="(item, index) in technologies.items" :key="item.id ?? index" class="min-w-0 border-b border-line py-5 md:py-6">
            <TechnologyLabel :technology="item" />
          </li>
        </ul>
      </section>
    </div>
  </section>
</template>

<style scoped>
.experience-title { font-size: clamp(4.1rem, 7.4vw, 7.8rem); }
.experience-reveal {
  opacity: 0;
  transform: translateY(0.85rem);
  transition: opacity 700ms var(--ease-editorial), transform 700ms var(--ease-editorial);
}
.is-visible .experience-reveal { opacity: 1; transform: none; }
.experience-reveal:nth-child(2) { transition-delay: 80ms; }
.experience-reveal:nth-child(3) { transition-delay: 140ms; }

@media (max-width: 639px) {
  .experience-title { font-size: clamp(3.8rem, 16vw, 5.8rem); }
}

@media (prefers-reduced-motion: reduce) {
  .experience-reveal { opacity: 1; transform: none; transition: none; }
}
</style>
