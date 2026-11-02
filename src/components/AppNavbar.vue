<script setup>
import { ref } from 'vue'
import { Menu, X } from 'lucide-vue-next'

const menuOpen = ref(false)

// Enable each anchor when its section is added to the page.
const sections = [
  { label: 'WORK', id: 'work', available: true },
  { label: 'ABOUT', id: 'about', available: true },
  { label: 'EXPERIENCE', id: 'experience', available: true },
  { label: 'CONTACT', id: 'contact', available: false },
]

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <header class="site-header relative z-10 w-full">
    <div class="page-container flex items-center justify-between gap-6 py-7 md:py-10">
      <a
        class="brand interactive-line inline-flex shrink-0 items-center text-[0.9rem] font-medium tracking-[0.13em] sm:text-[1rem]"
        href="#top"
        @click="closeMenu"
      >
        RENAN DE LIMA<sup class="ml-0.5 self-start text-[0.58em] leading-none">®</sup>
      </a>

      <nav aria-label="Navegação principal" class="hidden md:block">
        <ul class="flex items-center gap-8 lg:gap-12">
          <li v-for="section in sections" :key="section.id">
            <a
              v-if="section.available"
              class="interactive-line nav-label"
              :href="`#${section.id}`"
            >{{ section.label }}</a>
            <span v-else class="nav-label unavailable-link" :title="`${section.label} em breve`">
              {{ section.label }}
            </span>
          </li>
        </ul>
      </nav>

      <button
        class="menu-toggle inline-flex min-h-11 min-w-11 items-center justify-center md:hidden"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="mobile-navigation"
        :aria-label="menuOpen ? 'Fechar menu' : 'Abrir menu'"
        @click="menuOpen = !menuOpen"
        @keydown.esc="closeMenu"
      >
        <X v-if="menuOpen" :size="22" :stroke-width="1.5" aria-hidden="true" />
        <Menu v-else :size="22" :stroke-width="1.5" aria-hidden="true" />
      </button>
    </div>

    <nav
      v-show="menuOpen"
      id="mobile-navigation"
      aria-label="Navegação móvel"
      class="mobile-navigation page-container absolute inset-x-0 top-full border-t border-line bg-paper pb-6 pt-4 md:hidden"
      @keydown.esc="closeMenu"
    >
      <ul class="flex flex-col gap-1">
        <li v-for="section in sections" :key="section.id">
          <a
            v-if="section.available"
            class="nav-label block py-3"
            :href="`#${section.id}`"
            @click="closeMenu"
          >{{ section.label }}</a>
          <span v-else class="nav-label unavailable-link block py-3" :title="`${section.label} em breve`">
            {{ section.label }}
          </span>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.site-header { animation: appear 700ms var(--ease-editorial) both; }
.nav-label { font-size: 0.78rem; font-weight: 500; letter-spacing: 0.16em; }
.unavailable-link { color: var(--color-ink); }
@media (prefers-reduced-motion: reduce) {
  .site-header { animation: none; }
}
</style>
