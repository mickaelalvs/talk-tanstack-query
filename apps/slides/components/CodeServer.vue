<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const { path } = defineProps<{
  path: 'nantes-shop' | 'itinerant-heathcare' | 'trip-planner' | 'water-meter'
}>()

const url = computed(() => {
  return `http://localhost:1234/${path}`
})

const folderUrl = computed(() => {
  return `http://localhost:4000?folder=/Users/lucas/Workspace/Perso/Talks/talk-tanstack-query/apps/examples/src/app/${path}`
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
    <!-- Code Editor with Mac window -->
    <div class="mac-window" style="z-index: 2;">
      <div class="mac-titlebar">
        <div class="mac-controls">
          <div class="mac-control close"></div>
          <div class="mac-control minimize"></div>
          <div class="mac-control maximize"></div>
        </div>
        <div class="mac-title">Code Editor 💻</div>
      </div>
      <iframe class="iframe" :src="folderUrl" width="100%" height="100%" />
    </div>

    <!-- Result iframe with Mac window -->
    <div :class="['mac-window', 'result-window', { 'shown': showResultIframe }]" :style="{ zIndex: zIndex }">
      <div class="mac-titlebar">
        <div class="mac-controls">
          <div class="mac-control close"></div>
          <div class="mac-control minimize"></div>
          <div class="mac-control maximize"></div>
        </div>
        <div class="mac-title">Live Preview 🌐</div>
      </div>
      <iframe :class="resultIframeClass" :src="url" />
    </div>
  </div>
</template>

<style scoped>
.code-server {
  position: relative;
}

.mac-window {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #DAD9D5;
  zoom: 0.75;
}

.mac-titlebar {
  height: 30px;
  background: linear-gradient(to bottom, #FAF9F5, #FAF9F5);
  border-bottom: 1px solid #DAD9D5;
  display: flex;
  align-items: center;
  padding: 0 12px;
  position: relative;
}

.mac-controls {
  display: flex;
  gap: 8px;
  position: absolute;
  left: 12px;
}

.mac-control {
  width: 9px;
  height: 9px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mac-control.close {
  background: #ff5f57;
  border: 1px solid #e0443e;
}

.mac-control.close:hover {
  background: #ff3b30;
}

.mac-control.minimize {
  background: #ffbd2e;
  border: 1px solid #dea123;
}

.mac-control.minimize:hover {
  background: #ff9500;
}

.mac-control.maximize {
  background: #28ca42;
  border: 1px solid #1aad29;
}

.mac-control.maximize:hover {
  background: #20c933;
}

.mac-title {
  flex: 1;
  text-align: center;
  font-size: 10px;
  font-weight: 500;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.iframe {
  width: 100%;
  height: calc(100% - 28px);
  border: none;
  display: block;
}

.result-window {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -30%) scale(0.8);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  width: 100%;
  height: 100%;
  opacity: 0;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15),
    0px 4px 16px rgba(0, 0, 0, 0.10);
}

.result-window.shown {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
}

.result-window:not(.shown) {
  transform: translate(-50%, -30%) scale(0.8);
  opacity: 0;
}

.iframe.result {
  width: 100%;
  height: calc(100% - 28px);
}
</style>
