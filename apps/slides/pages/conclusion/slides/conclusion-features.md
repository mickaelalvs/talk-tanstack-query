---
title: "TanStack Query - Toutes ces features !"
layout: default
transition: fade
---

<Micka />

<div class="features-showcase">
  <div class="header">
    <h1>TanStack <span>Query</span></h1>
    <p class="subtitle">No dependencies. All the Features.</p>
  </div>
  
  <div class="features-grid">
    <div 
      v-for="(feature, index) in displayedFeatures" 
      :key="`${feature.name}-${index}`"
      class="feature-item"
      :class="fadeStates[index] || ''"
      :style="{ '--shadow-color': getShadowColor(index) }"
    >
      <div class="feature-icon">{{ feature.icon }}</div>
      <span>{{ feature.name }}</span>
    </div>
  </div>
</div>

<style scoped>
.features-showcase {
  padding: 1rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: #2d3748;
  overflow-y: auto;
}

.header {
  text-align: center;
  margin-bottom: 1.5rem;
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
}

.header h1 {
  font-size: 2.5rem;
  font-weight: 900;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  color: black;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.header h1 span {
  color: var(--theme-color-copper);
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.8;
  font-weight: 800;
  margin: 0;
  color: var(--theme-color-cloudBurst);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.8rem;
  max-width: 1000px;
  width: 100%;
  margin-bottom: 1.5rem;
}

.feature-item {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(200, 200, 200, 0.3);
  border-radius: 12px;
  padding: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  opacity: 1;
  transform: translateY(0) scale(1);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
  color: #2d3748;
  box-shadow: 0 4px 15px var(--shadow-color, rgba(0, 183, 216, 0.15));
}

.feature-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s ease;
}

.feature-item:hover::before {
  left: 100%;
}

.feature-item.fade-out {
  opacity: 0;
  transform: translateY(0) scale(1);
  transition: opacity 0.3s ease-out;
}

.feature-item.fade-in {
  opacity: 1;
  transform: translateY(0) scale(1);
  transition: opacity 0.3s ease-in;
}

.feature-icon {
  font-size: 1.5rem;
  min-width: 2rem;
  text-align: center;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.feature-item span {
  font-size: 0.9rem;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInScale {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}


/* Animation pour chaque feature qui apparaît */
.feature-item-enter {
  animation: slideInScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

/* Responsive */
@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .header h1 {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .feature-item {
    padding: 1rem;
  }
  
  .feature-icon {
    font-size: 1.3rem;
    min-width: 2rem;
  }
  
  .feature-item span {
    font-size: 0.85rem;
  }
}
</style>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Toutes les features disponibles
const allFeatures = [
  { icon: '🌐', name: 'Backend agnostic' },
  { icon: '🛠️', name: 'Dedicated Devtools' },
  { icon: '💾', name: 'Auto Caching' },
  { icon: '🔄', name: 'Auto Refetching' },
  { icon: '👁️', name: 'Window Focus Refetching' },
  { icon: '⏰', name: 'Polling/Realtime Queries' },
  { icon: '⚡', name: 'Parallel Queries' },
  { icon: '🔗', name: 'Dependent Queries' },
  { icon: '✏️', name: 'Mutations API' },
  { icon: '🗑️', name: 'Automatic Garbage Collection' },
  { icon: '📄', name: 'Paginated/Cursor Queries' },
  { icon: '📜', name: 'Load-More/Infinite Scroll' },
  { icon: '📍', name: 'Scroll Recovery' },
  { icon: '❌', name: 'Request Cancellation' },
  { icon: '⏳', name: 'Suspense Ready!' },
  { icon: '🎯', name: 'Render-as-you-fetch' },
  { icon: '🚀', name: 'Prefetching' },
  { icon: '📊', name: 'Variable-length Parallel Queries' },
  { icon: '📱', name: 'Offline Support' },
  { icon: '🌍', name: 'SSR Support' },
  { icon: '🎛️', name: 'Data Selectors' }
]

const displayedFeatures = ref([])
const changingIndex = ref(-1)
const fadeStates = ref({})
let intervalId = null
let currentIndex = 0

// Couleurs du thème pour les ombres
const themeColors = [
  'rgba(0, 183, 216, 0.15)',    // oasis
  'rgba(254, 149, 3, 0.15)',    // peachOrange
  'rgba(251, 53, 53, 0.15)',    // manhattan
  'rgba(199, 51, 33, 0.15)',    // copper
  'rgba(75, 143, 30, 0.15)',    // persianRed
  'rgba(16, 24, 40, 0.15)',     // persianPlum
  'rgba(209, 215, 229, 0.15)',  // geyser
]

// Fonction pour obtenir la couleur d'ombre selon l'index
function getShadowColor(index) {
  return themeColors[index % themeColors.length]
}

// Fonction pour mélanger un tableau
function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Fonction pour sélectionner 15 features aléatoires
function selectRandomFeatures() {
  const shuffled = shuffleArray(allFeatures)
  displayedFeatures.value = shuffled.slice(0, 15)
}

// Fonction pour changer une carte à la fois
function changeOneCard() {
  // Trouver une carte qui n'est pas déjà en train de changer
  const availableIndices = displayedFeatures.value
    .map((_, index) => index)
    .filter(index => index !== changingIndex.value)
  
  if (availableIndices.length === 0) return
  
  const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)]
  changingIndex.value = randomIndex
  
  // Fade out
  fadeStates.value[randomIndex] = 'fade-out'
  
  // Après le fade out, changer la feature et fade in
  setTimeout(() => {
    // Changer la feature
    const shuffled = shuffleArray(allFeatures)
    const newFeature = shuffled.find(f => 
      !displayedFeatures.value.some(df => df.name === f.name)
    ) || shuffled[0]
    
    displayedFeatures.value[randomIndex] = newFeature
    
    // Fade in
    fadeStates.value[randomIndex] = 'fade-in'
    
    // Reset après l'animation
    setTimeout(() => {
      fadeStates.value[randomIndex] = ''
      changingIndex.value = -1
    }, 300)
  }, 300)
}

// Initialiser avec 15 features aléatoires
selectRandomFeatures()

// Changer une carte toutes les 1.5 secondes
onMounted(() => {
  intervalId = setInterval(changeOneCard, 1500)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>
