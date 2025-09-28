---
title: "Pourquoi un SAV ?"
layout: single-fact
transition: view-transition
mdc: true
---

::fact::

<img src="/pages/explanations/assets/explode.png" alt="Explosion" class="w-32 h-32 mb-12 view-transition-fact" />

::title::

<span class="text-5xl font-black uppercase">
  <span class="state-management">Gestion de state</span>
</span>

<style scoped>
.state-management {
    view-transition-name: state-management;
}
</style>

---
title: "Pourquoi un SAV ?"
layout: single-fact
transition: view-transition
mdc: true
---

::fact::

<img src="/pages/explanations/assets/explode.png" alt="Explosion" class="w-32 h-32 mb-12 view-transition-fact" />

::title::

<span class="text-5xl font-black uppercase">
  <span class="state-management">Gestion de state</span>
  <br />
  =
  <br />
  <span v-mark="{ color: '#C73321', type: 'strike-through', width: 5 }">un cauchemar</span>
</span>

<style scoped>
.state-management {
    view-transition-name: state-management;
}
</style>

---
title: "Pourquoi un SAV ?"
layout: single-fact
transition: view-transition
mdc: true
---

::fact::

<img src="/pages/explanations/assets/explode.png" alt="Explosion" class="w-32 h-32 mb-12 view-transition-fact" />

::title::

<span class="text-5xl font-black uppercase">
  <span class="state-management">Gestion de state</span>
  <br />
  =
  <br />
  <span class="challenge">un défi pour beaucoup d'équipes</span>
</span>

<style scoped>
.state-management {
    view-transition-name: state-management;
}

.challenge {
    view-transition-name: challenge;
}
</style>

---
title: "Pourquoi un SAV ?"
layout: single-fact
transition: view-transition
mdc: true
---

::title::

<span class="text-5xl font-black uppercase">
  <span class="challenge">un défi pour beaucoup d'équipes</span>
</span>

::description::

<div class="tech-list">
  <div class="tech-item">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" alt="Redux" class="tech-logo" />
    <span class="tech-name">Redux</span>
  </div>
  <div class="tech-item">
    <div class="zustand-logo">Z</div>
    <span class="tech-name">Zustand</span>
  </div>
  <div class="tech-item">
    <div class="recoil-logo">⚛️</div>
    <span class="tech-name">Recoil</span>
  </div>
  <div class="tech-item">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React Context" class="tech-logo" />
    <span class="tech-name">Context</span>
  </div>
  <div class="tech-item">
    <div class="pinia-logo">🍍</div>
    <span class="tech-name">Pinia</span>
  </div>
  <div class="tech-item">
    <span class="tech-icon">🌐</span>
    <span class="tech-name">Réseau</span>
  </div>
  <div class="tech-item">
    <span class="tech-icon">💾</span>
    <span class="tech-name">Cache</span>
  </div>
  <div class="tech-item">
    <span class="tech-icon">⏳</span>
    <span class="tech-name">Loading</span>
  </div>
  <div class="tech-item">
    <span class="tech-icon">❌</span>
    <span class="tech-name">Erreur</span>
  </div>
</div>

<style scoped>
.challenge {
    view-transition-name: challenge;
}

.tech-list {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  margin: 3rem auto;
  text-align: center;
  flex-wrap: wrap;
  max-width: 700px;
  padding-top: 1rem;
}

.tech-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  animation: popIn 0.6s ease-out;
  animation-fill-mode: both;
}

.tech-item:hover {
  transform: scale(1.1);
}

.tech-logo {
  width: 64px;
  height: 64px;
  object-fit: contain;
}

.tech-icon {
  font-size: 4rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.zustand-logo {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #FF6B6B, #FF8E8E);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-weight: bold;
  font-size: 2.5rem;
}

.recoil-logo {
  font-size: 4rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pinia-logo {
  font-size: 4rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tech-name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--theme-color-cloudBurst);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Animation pop-in */
@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  50% {
    transform: scale(1.05) translateY(-5px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Délais d'animation différents pour chaque élément */
.tech-item:nth-child(1) { animation-delay: 0.1s; }
.tech-item:nth-child(2) { animation-delay: 0.2s; }
.tech-item:nth-child(3) { animation-delay: 0.3s; }
.tech-item:nth-child(4) { animation-delay: 0.4s; }
.tech-item:nth-child(5) { animation-delay: 0.5s; }
.tech-item:nth-child(6) { animation-delay: 0.6s; }
.tech-item:nth-child(7) { animation-delay: 0.7s; }
.tech-item:nth-child(8) { animation-delay: 0.8s; }
.tech-item:nth-child(9) { animation-delay: 0.9s; }
</style>