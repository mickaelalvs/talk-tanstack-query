<script setup lang="ts">
import Background from '../components/Background.vue'
import TanstackCorner from '../components/decorations/TanstackCorner.vue';
</script>

<template>
  <Background />
  <TanstackCorner />
  <div
    class="relative p-20 w-full h-full flex g-16 flex-col items-center justify-center text-center leading-tight text-5xl text-[var(--theme-color-oasis)]">
    <div class="font-bold text-9xl text-[var(--theme-color-cloudBurst)]">
      <slot name="fact" />
    </div>
    <div class="font-medium text-4xl text-[var(--theme-color-cloudBurst)]">
      <slot name="title" />
    </div>
    <div class="font-normal text-2xl text-[var(--theme-color-roofTerracotta)] pt-4">
      <slot name="description" />
    </div>
  </div>
</template>