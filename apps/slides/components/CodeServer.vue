<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const { path } = defineProps<{
  path: 'nantes-shop' | 'itinerant-heathcare' | 'trip-planner' | 'water-meter'
}>()

const url = computed(() => {
  return `http://localhost:1234/${path}`
})

const showResultIframe = ref(false)
const zIndex = ref(1)

function toggleIframe() {
  showResultIframe.value = !showResultIframe.value
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'c' || e.key === 'C') {
    toggleIframe()

    if (showResultIframe.value) {
      zIndex.value = 10
    } else {
        setTimeout(() => {
        zIndex.value = zIndex.value === 1 ? 10 : 1
        }, 500)
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})

const resultIframeClass = computed(() => {
  return showResultIframe.value ? 'iframe result shown' : 'iframe result'
})
</script>

<template>
  <div class="code-server" style="width: 100%; height: 100%">
    <iframe class="iframe" src="http://localhost:4000" width="100%" height="100%" style="z-index: 2;" />
    <iframe :class="resultIframeClass" :src="url" :style="{ zIndex: zIndex }" />
  </div>
</template>

<style scoped>
.code-server {
    position: relative;
}

.iframe {
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    border-radius: 10px;
}

.iframe.result {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: 0.3s ease-in-out;
    width: 98%;
    height: 97%;
    zoom: 0.75;
}

.iframe.result.shown {
    /* https://smoothshadows.com/#djEsMSw1LDAuNSw3MCwxLDAsIzAwMDAwMCwjZmZmZmZmLCNmZmZmZmYsMg%3D%3D */
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.10),
        0px 0px 11px rgba(0, 0, 0, 0.20),
        0px 0px 25px rgba(0, 0, 0, 0.30),
        0px 1px 45px rgba(0, 0, 0, 0.40),
        0px 1px 70px rgba(0, 0, 0, 0.50);
    opacity: 1;
}

.iframe.result:not(.shown) {
    box-shadow: none;
    opacity: 0;
}
</style>
