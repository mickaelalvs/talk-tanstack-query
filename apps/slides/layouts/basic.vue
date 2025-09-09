<script setup lang="ts">
import Background from '../components/Background.vue'
</script>

<template>
  <Background />
  <div
    class="relative z-1 p-20 w-full h-full flex flex-wrap items-center justify-evenly text-center leading-tight text-5xl text-[var(--theme-color-oasis)] font-black">
    <slot />
  </div>
</template>
