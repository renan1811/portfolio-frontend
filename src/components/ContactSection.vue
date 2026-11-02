<script setup>
import { ArrowUp, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-vue-next'

const email = 'rennlima477@gmail.com'
</script>

<template>
  <section id="contact" aria-labelledby="contact-title" class="page-container w-full scroll-mt-8 pt-24 pb-8 md:pt-36 md:pb-10">
    <div class="mb-8 flex items-center gap-5 text-[0.72rem] font-medium tracking-[0.16em] text-accent md:mb-10">
      <span aria-hidden="true" class="h-px w-11 bg-accent md:w-20"></span>
      <p>05 / CONTACT</p>
    </div>

    <div class="grid gap-14 border-t border-line pt-12 md:pt-16 lg:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.65fr)] lg:gap-16">
      <div class="min-w-0">
        <h2 id="contact-title" class="contact-title font-editorial leading-[0.84] tracking-[-0.06em] text-ink">
          Have something in mind?
          <em class="mt-[0.12em] block text-accent">Let's build something together.</em>
        </h2>

        <a :href="`mailto:${email}`" class="contact-action interactive-line mt-12 inline-flex min-h-11 items-center gap-3 text-base font-medium text-ink md:mt-16">
          Entrar em contato
          <ArrowUpRight :size="20" :stroke-width="1.5" aria-hidden="true" />
        </a>
      </div>

      <div class="min-w-0 lg:pt-3">
        <p class="max-w-[27rem] text-[1.15rem] leading-[1.6] text-ink md:text-[1.25rem]">
          Estou sempre aberto a novas ideias, projetos e oportunidades. Se quiser conversar, é só me chamar.
        </p>

        <ul class="mt-10 border-t border-line md:mt-14">
          <li class="border-b border-line">
            <a :href="`mailto:${email}`" class="flex min-h-16 min-w-0 items-center gap-3 py-4 text-sm text-ink">
              <Mail :size="19" :stroke-width="1.5" class="shrink-0 text-accent" aria-hidden="true" />
              <span class="interactive-line min-w-0 break-all">{{ email }}</span>
              <ArrowUpRight :size="17" :stroke-width="1.5" class="ml-auto shrink-0 text-accent" aria-hidden="true" />
            </a>
          </li>
          <li class="border-b border-line">
            <a href="https://www.linkedin.com/in/renan-de-lima-3876532b8/" target="_blank" rel="noopener noreferrer" class="flex min-h-16 items-center gap-3 py-4 text-sm text-ink">
              <Linkedin :size="19" :stroke-width="1.5" class="shrink-0 text-accent" aria-hidden="true" />
              <span class="interactive-line">LinkedIn</span>
              <ArrowUpRight :size="17" :stroke-width="1.5" class="ml-auto shrink-0 text-accent" aria-hidden="true" />
            </a>
          </li>
          <li class="border-b border-line">
            <a href="https://github.com/rennlima" target="_blank" rel="noopener noreferrer" class="flex min-h-16 items-center gap-3 py-4 text-sm text-ink">
              <Github :size="19" :stroke-width="1.5" class="shrink-0 text-accent" aria-hidden="true" />
              <span class="interactive-line">GitHub</span>
              <ArrowUpRight :size="17" :stroke-width="1.5" class="ml-auto shrink-0 text-accent" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </div>

    <footer class="mt-24 flex flex-col gap-5 border-t border-line pt-6 text-xs leading-relaxed tracking-[0.05em] text-accent md:mt-36 md:flex-row md:items-center md:justify-between md:gap-8">
      <p>© 2026 Renan de Lima</p>
      <p>Desenvolvimento / Colaboração / Novos projetos</p>
      <a href="#top" class="interactive-line inline-flex min-h-11 self-start items-center gap-2 font-medium md:self-auto">
        VOLTAR AO TOPO
        <ArrowUp :size="15" :stroke-width="1.5" aria-hidden="true" />
      </a>
    </footer>
  </section>
</template>

<style scoped>
.contact-title { font-size: clamp(4.25rem, 7.3vw, 8.5rem); }

@media (max-width: 639px) {
  .contact-title { font-size: clamp(3.5rem, 15vw, 5.5rem); }
}
</style>
