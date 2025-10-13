---
title: "Loading"
layout: logo-bounce
transition: fade
---

<WordsPop :words="['...', 'Réseau instab...bzz', 'Grrrr', 'Connexion', 'Offline ?', 'Vous m\'entendez ?']" :interval="800" :duration="4000" />

<div class="loading-text">
  <div class="sav-waiting">
    <div class="phone-icon">
      <img src="/assets/images/phone-1.png" alt="Phone" class="h-20" />
    </div>
    <h1>Service Client TanStack Query</h1>
    <div class="waiting-message">
      <p>Traitement en cours...</p>
      <div class="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</div>


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

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>
