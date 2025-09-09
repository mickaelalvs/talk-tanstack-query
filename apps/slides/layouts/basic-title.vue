<script setup>
import Background from '../components/Background.vue'
import FallingPhone from '../components/decorations/FallingPhone.vue';

defineProps({
  padding: {
    type: String,
    default: 'p-20'
  },
  background: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <Background />
  <FallingPhone />
  <h1 class="absolute left-22 top-10 text-3xl font-black text-[var(--theme-color-cloudBurst)]">
    <slot name="title" />
  </h1>
  <div class="relative z-1 w-full h-full flex flex-wrap items-center justify-evenly text-center leading-tight text-5xl">
    <slot />
  </div>
</template>
