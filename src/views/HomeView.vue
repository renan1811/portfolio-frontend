<script setup>
import AppNavbar from '../components/AppNavbar.vue'
import HeroSection from '../components/HeroSection.vue'
import SelectedWork from '../components/SelectedWork.vue'
import AboutSection from '../components/AboutSection.vue'
import ExperienceSection from '../components/ExperienceSection.vue'
import ContactSection from '../components/ContactSection.vue'
</script>

<template>
  <div id="top" class="flex min-h-svh flex-col">
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
