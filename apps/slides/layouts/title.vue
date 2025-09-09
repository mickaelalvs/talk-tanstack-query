<script setup lang="ts">
import Background from '../components/Background.vue';
import PhoneCorner from '../components/decorations/PhoneCorner.vue';
</script>

<template>
  <Background />
  <PhoneCorner side="left" />
  <div
    class="relative z-1 w-full h-full flex flex-col items-center justify-center text-5xl text-[var(--theme-color-persianRed)] custom-font">
    <slot />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap');

.custom-font {
  font-size: 5rem;
  font-family: "Alfa Slab One", serif;
  text-wrap: balance;
  color: var(--theme-color-cloudBurst);
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
</style>