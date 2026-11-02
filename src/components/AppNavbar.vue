<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Menu, Moon, Sun, X } from 'lucide-vue-next'

const menuOpen = ref(false)
const isDarkTheme = ref(document.documentElement.dataset.theme === 'dark')
const isScrolled = ref(false)
const activeSection = ref(null)
const headerElement = ref(null)
const intersectingSections = new Set()
let sectionObserver
const themeStorageKey = 'renan-portfolio-theme'

function toggleTheme() {
  isDarkTheme.value = !isDarkTheme.value
  const theme = isDarkTheme.value ? 'dark' : 'light'
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDarkTheme.value ? '#171B20' : '#F5F2EB')

  try {
    localStorage.setItem(themeStorageKey, theme)
  } catch {
    // The theme still applies for this visit when storage is unavailable.
  }
}

// Enable each anchor when its section is added to the page.
const sections = [
  { label: 'PROJETOS', id: 'work', available: true },
  { label: 'SOBRE MIM', id: 'about', available: true },
  { label: 'EXPERIÊNCIA', id: 'experience', available: true },
  { label: 'CONTATO', id: 'contact', available: true },
]

function closeMenu() {
  menuOpen.value = false
}

function updateScrollState() {
  isScrolled.value = window.scrollY > 8
}

function observeSections() {
  sectionObserver?.disconnect()
  intersectingSections.clear()

  const headerHeight = Math.ceil(headerElement.value?.getBoundingClientRect().height ?? 0)
  sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) intersectingSections.add(entry.target.id)
      else intersectingSections.delete(entry.target.id)
    })

    const marker = headerHeight + 12
    const current = [...intersectingSections]
      .map((id) => document.getElementById(id))
      .filter(Boolean)
      .sort((a, b) => Math.abs(a.getBoundingClientRect().top - marker) - Math.abs(b.getBoundingClientRect().top - marker))[0]

    activeSection.value = current?.id ?? null
  }, { rootMargin: `-${headerHeight + 12}px 0px -65% 0px`, threshold: 0 })

  sections.forEach(({ id }) => {
    const section = document.getElementById(id)
    if (section) sectionObserver.observe(section)
  })
}

function handleResize() {
  observeSections()
}

onMounted(() => {
  updateScrollState()
  observeSections()
  window.addEventListener('scroll', updateScrollState, { passive: true })
  window.addEventListener('resize', handleResize, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScrollState)
  window.removeEventListener('resize', handleResize)
  sectionObserver?.disconnect()
})
</script>

<template>
  <header ref="headerElement" class="site-header sticky top-0 z-50 w-full border-b border-transparent" :class="{ 'is-scrolled': isScrolled }">
    <div class="page-container flex items-center justify-between gap-3 py-4 md:gap-6 md:py-6">
      <a
        class="brand interactive-line inline-flex shrink-0 cursor-pointer items-center text-[0.9rem] font-medium tracking-[0.13em] sm:text-[1rem]"
        href="#top"
        @click="closeMenu"
      >
        RENAN DE LIMA<sup class="ml-0.5 self-start text-[0.58em] leading-none">®</sup>
      </a>

      <div class="hidden shrink-0 items-center gap-5 md:flex lg:gap-7">
        <nav aria-label="Navegação principal">
          <ul class="flex items-center gap-8 lg:gap-12">
            <li v-for="section in sections" :key="section.id">
              <a
                v-if="section.available"
                class="interactive-line nav-label cursor-pointer"
                :class="{ 'is-active': activeSection === section.id }"
                :aria-current="activeSection === section.id ? 'location' : undefined"
                :href="`#${section.id}`"
              >{{ section.label }}</a>
              <span v-else class="nav-label unavailable-link" :title="`${section.label} em breve`">
                {{ section.label }}
              </span>
            </li>
          </ul>
        </nav>

        <span aria-hidden="true" class="h-5 w-px shrink-0 bg-line"></span>

        <button
          class="theme-toggle inline-flex size-11 shrink-0 cursor-pointer items-center justify-center text-ink transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          type="button"
          :aria-label="isDarkTheme ? 'Ativar tema claro' : 'Ativar tema escuro'"
          :title="isDarkTheme ? 'Ativar tema claro' : 'Ativar tema escuro'"
          @click="toggleTheme"
        >
          <Sun v-if="isDarkTheme" :size="19" :stroke-width="1.5" aria-hidden="true" />
          <Moon v-else :size="19" :stroke-width="1.5" aria-hidden="true" />
        </button>
      </div>

      <div class="flex shrink-0 items-center gap-2 md:hidden">
        <button
          class="theme-toggle inline-flex size-11 shrink-0 cursor-pointer items-center justify-center text-ink transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          type="button"
          :aria-label="isDarkTheme ? 'Ativar tema claro' : 'Ativar tema escuro'"
          :title="isDarkTheme ? 'Ativar tema claro' : 'Ativar tema escuro'"
          @click="toggleTheme"
        >
          <Sun v-if="isDarkTheme" :size="19" :stroke-width="1.5" aria-hidden="true" />
          <Moon v-else :size="19" :stroke-width="1.5" aria-hidden="true" />
        </button>

        <span aria-hidden="true" class="h-5 w-px shrink-0 bg-line"></span>

        <button
          class="menu-toggle inline-flex size-11 shrink-0 cursor-pointer items-center justify-center text-ink transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
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

    </div>

    <nav
      v-show="menuOpen"
      id="mobile-navigation"
      aria-label="Navegação móvel"
      class="mobile-navigation page-container absolute inset-x-0 top-full z-50 max-h-[calc(100svh-5rem)] overflow-y-auto border-t border-line bg-paper pb-6 pt-4 md:hidden"
      @keydown.esc="closeMenu"
    >
      <ul class="flex flex-col gap-1">
        <li v-for="section in sections" :key="section.id">
          <a
            v-if="section.available"
            class="interactive-line nav-label block cursor-pointer py-3"
            :class="{ 'is-active': activeSection === section.id }"
            :aria-current="activeSection === section.id ? 'location' : undefined"
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
.site-header {
  animation: appear 780ms var(--ease-editorial) both;
  background-color: transparent;
  transition: background-color 240ms var(--ease-editorial), border-color 240ms var(--ease-editorial), backdrop-filter 240ms var(--ease-editorial);
}
.site-header.is-scrolled {
  background-color: color-mix(in srgb, var(--color-background) 94%, transparent);
  border-color: var(--color-line);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
}
.nav-label { font-size: 0.78rem; font-weight: 500; letter-spacing: 0.16em; }
.nav-label.is-active { color: var(--color-accent); }
.nav-label.is-active::after { transform: scaleX(1); }
.unavailable-link { color: var(--color-ink); }

:global(#work), :global(#about), :global(#experience), :global(#contact) {
  scroll-margin-top: 6rem;
}

@media (max-width: 767px) {
  :global(#work), :global(#about), :global(#experience), :global(#contact) {
    scroll-margin-top: 5.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .site-header { animation: none; }
  .site-header, .nav-label { transition: none; }
}
</style>
