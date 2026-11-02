<script setup>
import { ArrowUp, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-vue-next'
import { ref } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'

const email = 'rennlima477@gmail.com'
const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`
const sectionElement = ref(null)
useScrollReveal(sectionElement)
</script>

<template>
  <section id="contact" ref="sectionElement" aria-labelledby="contact-title" class="page-container w-full scroll-mt-8 pt-20 pb-8 md:pt-24 md:pb-10">
    <div data-scroll-reveal class="mb-7 flex items-center gap-5 text-[0.72rem] font-medium tracking-[0.16em] text-accent md:mb-9">
      <span aria-hidden="true" class="h-px w-11 bg-accent md:w-20"></span>
      <p>05 / CONTATO</p>
    </div>

    <header class="border-b border-line pb-8 md:pb-10">
      <h2 id="contact-title" data-scroll-reveal style="--reveal-delay: 70ms" class="contact-title font-editorial leading-[0.84] tracking-[-0.06em] text-ink">
        Vamos <em class="text-accent">conversar.</em>
      </h2>
      <p data-scroll-reveal style="--reveal-delay: 140ms" class="mt-4 text-[0.7rem] font-medium tracking-[0.18em] text-accent md:mt-5">TEM ALGUMA IDEIA EM MENTE?</p>
    </header>

    <div class="grid gap-10 pt-8 md:pt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] lg:gap-12">
      <div class="min-w-0 lg:pt-1">
        <p data-scroll-reveal style="--reveal-delay: 80ms" class="max-w-[30rem] text-[clamp(1.125rem,1.4vw,1.25rem)] leading-[1.65] text-ink">
          Estou sempre aberto a novas ideias, projetos e oportunidades. Se quiser conversar, é só me chamar.
        </p>
        <a data-scroll-reveal style="--reveal-delay: 140ms" :href="gmailComposeUrl" target="_blank" rel="noopener noreferrer" class="interactive-line mt-6 inline-flex min-h-11 items-center gap-2 text-base font-medium text-accent">
          Entrar em contato
          <ArrowUpRight :size="19" :stroke-width="1.5" aria-hidden="true" />
        </a>
      </div>

      <ul class="min-w-0 border-t border-line">
        <li data-scroll-reveal style="--reveal-delay: 80ms" class="border-b border-line">
          <a :href="gmailComposeUrl" target="_blank" rel="noopener noreferrer" class="contact-link flex min-h-16 min-w-0 items-center gap-3 py-4 text-sm text-ink">
            <Mail :size="19" :stroke-width="1.5" class="shrink-0 text-accent" aria-hidden="true" />
            <span class="interactive-line min-w-0 break-all">{{ email }}</span>
            <ArrowUpRight :size="17" :stroke-width="1.5" class="ml-auto shrink-0 text-accent" aria-hidden="true" />
          </a>
        </li>
        <li data-scroll-reveal style="--reveal-delay: 140ms" class="border-b border-line">
          <a href="https://www.linkedin.com/in/renan-de-lima-3876532b8/" target="_blank" rel="noopener noreferrer" class="contact-link flex min-h-16 items-center gap-3 py-4 text-sm text-ink">
            <Linkedin :size="19" :stroke-width="1.5" class="shrink-0 text-accent" aria-hidden="true" />
            <span class="interactive-line">LinkedIn</span>
            <ArrowUpRight :size="17" :stroke-width="1.5" class="ml-auto shrink-0 text-accent" aria-hidden="true" />
          </a>
        </li>
        <li data-scroll-reveal style="--reveal-delay: 200ms" class="border-b border-line">
          <a href="https://github.com/renan1811" target="_blank" rel="noopener noreferrer" class="contact-link flex min-h-16 items-center gap-3 py-4 text-sm text-ink">
            <Github :size="19" :stroke-width="1.5" class="shrink-0 text-accent" aria-hidden="true" />
            <span class="interactive-line">GitHub</span>
            <ArrowUpRight :size="17" :stroke-width="1.5" class="ml-auto shrink-0 text-accent" aria-hidden="true" />
          </a>
        </li>
      </ul>
    </div>

    <footer data-scroll-reveal class="mt-16 flex flex-col gap-2 border-t border-line pt-5 text-[0.68rem] font-medium tracking-[0.14em] text-accent sm:flex-row sm:items-center sm:justify-between md:mt-20">
      <p>© 2026 RENAN DE LIMA</p>
      <a href="#top" class="interactive-line inline-flex min-h-11 self-start items-center gap-2 sm:self-auto">
        VOLTAR AO TOPO
        <ArrowUp :size="15" :stroke-width="1.5" aria-hidden="true" />
      </a>
    </footer>
  </section>
</template>

<style scoped>
.contact-title { font-size: clamp(3.8rem, 7.2vw, 6.75rem); }

@media (max-width: 639px) {
  .contact-title { font-size: clamp(2.45rem, 11.5vw, 3.2rem); }
}
</style>
