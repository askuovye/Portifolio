<script setup lang="ts">
import AboutIntro from '@/components/about/AboutIntro.vue'
import ContactLinks from '@/components/about/ContactLinks.vue'
import PersonalBackground from '@/components/about/PersonalBackground.vue'
import TechnicalIdentity from '@/components/about/TechnicalIdentity.vue'
import WorkSummary from '@/components/about/WorkSummary.vue'
</script>

<template>
  <main>
    <AboutIntro />
    <TechnicalIdentity />
    <WorkSummary />
    <PersonalBackground />
    <ContactLinks />
  </main>
</template>
