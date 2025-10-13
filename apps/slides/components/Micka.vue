<script setup lang="ts">
import { ref } from 'vue'
import { onSlideEnter, onSlideLeave } from '@slidev/client'

const isVisible = ref(false)

// Quand on entre sur la slide
onSlideEnter(() => {
    isVisible.value = true
})

// Quand on quitte la slide
onSlideLeave(() => {
    isVisible.value = false
})
</script>

<template>
    <Teleport to="body">
        <div v-show="isVisible" class="micka-shadow"></div>
    </Teleport>
</template>

<style scoped>
.micka-shadow {
    position: fixed;
    top: -100px;
    right: -100px;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle at top right, rgba(0, 183, 216, 0.2) 0%, rgba(0, 183, 216, 0.1) 40%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    filter: blur(30px);
}
</style>
