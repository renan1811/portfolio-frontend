<script setup>
import { ref } from 'vue'
import AppNavbar from '../components/AppNavbar.vue'
import HeroSection from '../components/HeroSection.vue'
import SelectedWork from '../components/SelectedWork.vue'
import AboutSection from '../components/AboutSection.vue'
import ExperienceSection from '../components/ExperienceSection.vue'
import ContactSection from '../components/ContactSection.vue'
import { useAnchorScroll } from '../composables/useAnchorScroll'

const pageRoot = ref(null)
useAnchorScroll(pageRoot)
</script>

<template>
  <div id="top" ref="pageRoot" class="flex min-h-svh flex-col">
    <AppNavbar />
    <main class="flex flex-1 flex-col">
      <HeroSection />
      <SelectedWork />
      <AboutSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  </div>
</template>
