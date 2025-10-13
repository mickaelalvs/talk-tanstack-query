<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import { onSlideEnter, onSlideLeave } from '@slidev/client'

const props = defineProps<{
    words: string[]
    interval?: number // temps entre chaque mot en ms
    duration?: number // durée d'affichage de chaque mot en ms
}>()

const activeWords = ref<Array<{ id: number; text: string; opacity: number; y: number; x: number }>>([])
let wordId = 0
let currentWordIndex = 0
let timeoutIds: number[] = []
let isRunning = false

const reset = () => {
    // Nettoyer les timeouts existants
    timeoutIds.forEach(id => clearTimeout(id))
    timeoutIds = []

    // Réinitialiser l'état
    activeWords.value = []
    currentWordIndex = 0
    wordId = 0
    isRunning = false
}

const start = () => {
    // Ne démarre que si ce n'est pas déjà en cours
    if (isRunning) return

    reset()
    isRunning = true
    spawnWord()
}

const spawnWord = () => {
    if (currentWordIndex >= props.words.length) return

    const word = props.words[currentWordIndex]
    currentWordIndex++

    const randomX = Math.random() * 80 + 10 // Entre 10% et 90% de la largeur

    const newWord = {
        id: wordId++,
        text: word,
        opacity: 0.15, // Directement à l'opacité finale
        y: 100, // Position de départ en bas
        x: randomX
    }

    activeWords.value.push(newWord)

    // Animation de montée vers le haut
    const timeout1 = window.setTimeout(() => {
        const word = activeWords.value.find(w => w.id === newWord.id)
        if (word) {
            word.y = -300 // Monte extrêmement haut
        }
    }, 50)
    timeoutIds.push(timeout1)

    // Disparition
    const timeout2 = window.setTimeout(() => {
        const word = activeWords.value.find(w => w.id === newWord.id)
        if (word) {
            word.opacity = 0
        }
    }, (props.duration || 3000) - 500)
    timeoutIds.push(timeout2)

    // Suppression
    const timeout3 = window.setTimeout(() => {
        activeWords.value = activeWords.value.filter(w => w.id !== newWord.id)
    }, props.duration || 3000)
    timeoutIds.push(timeout3)

    // Planifier le mot suivant
    if (currentWordIndex < props.words.length) {
        const timeout4 = window.setTimeout(spawnWord, props.interval || 2000)
        timeoutIds.push(timeout4)
    }
}

// Démarrer l'animation quand on entre sur la slide
onSlideEnter(() => {
    start()
})

// Arrêter l'animation quand on quitte la slide
onSlideLeave(() => {
    reset()
})

onBeforeUnmount(() => {
    reset()
})
</script>

<template>
    <div class="words-pop-container">
        <div v-for="word in activeWords" :key="word.id" class="floating-word" :style="{
            opacity: word.opacity,
            transform: `translate(-50%, ${word.y}%)`,
            left: `${word.x}%`
        }">
            {{ word.text }}
        </div>
    </div>
</template>

<style scoped>
.words-pop-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
}

.floating-word {
    position: absolute;
    bottom: 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--theme-color-copper, #C73321);
    transition: all 5s ease-out;
    white-space: nowrap;
    text-shadow: none;
    font-style: italic;
}
</style>
