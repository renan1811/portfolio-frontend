<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

// The optional asset is bundled when it exists and leaves the section usable until then.
const profilePhoto = import.meta.glob('../assets/renan-profile.png', {
  eager: true,
  query: '?url',
  import: 'default',
})['../assets/renan-profile.png']

const photoFailed = ref(false)
const sectionContent = ref(null)
const isVisible = ref(false)
let observer

const details = [
  { label: 'LOCALIZAÇÃO', value: 'Joinville, SC' },
  { label: 'FORMAÇÃO', value: 'Técnico em Informática para Internet — IFC' },
  { label: 'ATUAÇÃO', value: 'Bolsista da Fábrica de Software — IFC' },
  { label: 'FOCO', value: 'Desenvolvimento Web' },
]

onMounted(() => {
  if (!('IntersectionObserver' in window)) {
    isVisible.value = true
    return
  }

  observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return
    isVisible.value = true
    observer.disconnect()
  }, { threshold: 0.1 })
  observer.observe(sectionContent.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section ref="sectionContent" id="about" aria-labelledby="about-title" class="page-container w-full scroll-mt-8 pb-20 md:pb-24" :class="{ 'is-visible': isVisible }">
    <div class="mb-8 flex items-center gap-5 text-[0.72rem] font-medium tracking-[0.16em] text-accent md:mb-10">
      <span aria-hidden="true" class="h-px w-11 bg-accent md:w-20"></span>
      <p>03 / ABOUT ME</p>
    </div>

    <h2 id="about-title" class="about-title about-reveal font-editorial leading-[0.82] tracking-[-0.065em] text-ink">
      <span class="block sm:inline">Além do</span>{{ ' ' }}<em class="text-accent">código.</em>
    </h2>

    <div class="about-layout mt-12 border-t border-line pt-12 md:mt-16 md:pt-16">
      <figure class="about-portrait about-reveal">
        <img
          v-if="profilePhoto && !photoFailed"
          :src="profilePhoto"
          alt="Retrato de Renan de Lima"
          class="block h-auto w-full"
          decoding="async"
          @error="photoFailed = true"
        />
        <div v-else class="flex aspect-[3/4] items-end border border-line bg-line/20 p-6">
          <span class="text-[0.7rem] font-medium tracking-[0.16em] text-accent uppercase">Fotografia em breve</span>
        </div>
      </figure>

      <div class="about-body min-w-0">
        <div class="about-copy about-reveal max-w-[46rem] font-editorial text-ink">
          <p class="text-[clamp(1.6rem,2.1vw,1.95rem)] leading-[1.13]">
            Sou Renan, desenvolvedor de software e estudante do curso Técnico em Informática para Internet no Instituto Federal Catarinense.
          </p>
          <p class="mt-4 text-[clamp(1.25rem,1.45vw,1.45rem)] leading-[1.22]">
            Atualmente sou bolsista da Fábrica de Software do IFC, onde participo do desenvolvimento de aplicações web e tenho a oportunidade de trabalhar em projetos reais, desde o planejamento até a implementação.
          </p>
          <p class="mt-3 text-[clamp(1.25rem,1.45vw,1.45rem)] leading-[1.22]">
            Ao longo da minha trajetória, também participei de hackathons, desenvolvendo soluções em equipe e aprendendo a lidar com desafios, prazos curtos e diferentes ideias.
          </p>
          <p class="mt-3 text-[clamp(1.25rem,1.45vw,1.45rem)] leading-[1.22]">
            Gosto tanto da parte técnica quanto da visual de um projeto. Para mim, não basta uma aplicação funcionar bem: ela também precisa ser intuitiva e oferecer uma boa experiência para quem utiliza.
          </p>
        </div>

        <dl class="about-details about-reveal grid w-full max-w-[46rem] self-start sm:grid-cols-2">
          <div v-for="detail in details" :key="detail.label" class="border-t border-line py-4 last:border-b sm:py-5">
            <dt class="text-[0.7rem] font-medium tracking-[0.16em] text-accent">{{ detail.label }}</dt>
            <dd class="mt-2 font-editorial text-[1.35rem] leading-[1.12] text-ink">{{ detail.value }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  row-gap: clamp(2.5rem, 4vw, 3.5rem);
  align-items: start;
}
.about-portrait { width: min(100%, 28rem); margin-inline: auto; }
.about-title { font-size: clamp(4.5rem, 9.5vw, 9.5rem); }
.about-details { margin-top: 2rem; }
.about-reveal {
  opacity: 0;
  transform: translateY(1rem);
  transition: opacity 700ms var(--ease-editorial), transform 700ms var(--ease-editorial);
}
.is-visible .about-reveal { opacity: 1; transform: none; }
.about-title { transition-delay: 80ms; }
.about-copy { transition-delay: 140ms; }
.about-details { transition-delay: 200ms; }

@media (min-width: 1024px) {
  .about-layout {
    grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
    column-gap: clamp(2.5rem, 4vw, 4.5rem);
  }
  .about-portrait {
    width: auto;
    margin-left: calc(-1 * var(--space-page));
    margin-right: 0;
  }
}

@media (min-width: 768px) {
  .about-title { white-space: nowrap; }
}

@media (max-width: 639px) {
  .about-title { font-size: clamp(4.1rem, 18vw, 6rem); }
}

@media (min-width: 640px) {
  .about-details > div:nth-child(even) { border-left: 1px solid var(--color-line); padding-left: 1.5rem; }
  .about-details > div:nth-child(odd) { padding-right: 1.5rem; }
  .about-details > div:nth-last-child(-n+2) { border-bottom: 1px solid var(--color-line); }
}

@media (prefers-reduced-motion: reduce) {
  .about-reveal { opacity: 1; transform: none; transition: none; }
}
</style>
