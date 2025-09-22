<script setup lang="ts">
import Background from '../components/Background.vue'
</script>

<template>
  <Background />
  <div
    class="relative z-1 p-5 w-full h-full flex items-center justify-center">
    <slot />
  </div>
</template>
