---
title: "Loading"
layout: logo-bounce
transition: fade
---

<div class="loading-text" @click="playAudio">
  <audio 
    ref="ringAudio" 
    loop
    preload="auto"
  >
    <source src="./assets/ring.mp3" type="audio/mpeg">
  </audio>
  <div class="sav-waiting">
    <div class="phone-icon animated">
      <img src="/assets/images/phone-1.png" alt="Phone" class="h-20" />
    </div>
    <h1>Service Client TanStack Query</h1>
    <div class="waiting-message">
      <p>Appel en cours...</p>
      <div class="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</div>

<script setup>
import { ref, onMounted } from 'vue'
import { onSlideLeave, onSlideEnter } from '@slidev/client'

const ringAudio = ref(null)

const playAudio = () => {
  if (ringAudio.value) {
    if (ringAudio.value.paused) {
      ringAudio.value.play()
    } else {
      ringAudio.value.pause()
    }
  }
}

const stopAudio = () => {
  if (ringAudio.value) {
    ringAudio.value.pause()
    ringAudio.value.currentTime = 0
  }
}

// Arrêter l'audio quand on quitte la slide
onSlideLeave(() => {
  console.log('onSlideLeave')
  stopAudio()
})

// S'assurer que l'audio est arrêté quand on entre sur la slide
onSlideEnter(() => {
  console.log('onSlideEnter')
  playAudio()
})

// S'assurer que l'audio est arrêté au montage
onMounted(() => {
  console.log('onMounted')
  stopAudio()
})
</script>


<style scoped>
.loading-text {
  text-align: center;
  color: white;
  z-index: 10;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.sav-waiting {
  padding: 1.5rem 2rem;
  border-radius: 12px;
}

.phone-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.6rem;
}

.phone-icon.animated {
  animation: ring 2s ease-in-out infinite;
  animation-delay: 1s;
}


.sav-waiting h1 {
  font-size: 1.5rem;
  font-weight: 900;
  margin: 0 0 1rem 0;
  color: var(--theme-color-copper);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.waiting-message {
  margin-bottom: 1rem;
}

.waiting-message p {
  font-size: 1.2rem;
  margin: 0 0 0.6rem 0;
  opacity: 0.9;
  font-weight: 700;
}

.dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  opacity: 0;
}

.dots span {
  width: 20px;
  height: 20px;
  background: var(--theme-color-copper);
  border-radius: 50%;
  animation: bounce 1.4s ease-in-out infinite both;
  margin-top: 3rem;
}

.dots span:nth-child(1) { animation-delay: -0.32s; }
.dots span:nth-child(2) { animation-delay: -0.16s; }
.dots span:nth-child(3) { animation-delay: 0s; }

@keyframes ring {
  0%, 30% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
  35% {
    transform: translateY(-25px) rotate(0deg) scale(1.15);
  }
  40% {
    transform: translateY(-25px) rotate(-3deg) scale(1.15);
  }
  45% {
    transform: translateY(-25px) rotate(3deg) scale(1.15);
  }
  50% {
    transform: translateY(-25px) rotate(-2deg) scale(1.15);
  }
  55% {
    transform: translateY(-25px) rotate(2deg) scale(1.15);
  }
  60% {
    transform: translateY(-25px) rotate(-1deg) scale(1.15);
  }
  65% {
    transform: translateY(-25px) rotate(1deg) scale(1.15);
  }
  70% {
    transform: translateY(-25px) rotate(0deg) scale(1.15);
  }
  100% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>

<!--
1 : Lucas
2 : Micka
3 : Lucas
4 : Micka
5 : Lucas
6 : Micka
-->
