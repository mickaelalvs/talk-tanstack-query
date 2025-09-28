---
title: "Notre solution"
layout: basic
transition: view-transition
mdc: true
---

<div class="solution-container">
  <h1 class="solution-title">
    TanStack Query <img src="/assets/images/tanstack.png" alt="TanStack Query" class="tanstack-logo" />
  </h1>
  <div class="reasons-container">
     <div class="reason-item" v-click>
       <div class="reason-icon">🎯</div>
       <h3 class="reason-title">Cache Intelligent</h3>
     </div>
     <div class="reason-item" v-click>
       <div class="reason-icon">🔧</div>
       <h3 class="reason-title">Extensible</h3>
     </div>
     <div class="reason-item" v-click>
       <div class="reason-icon">💡</div>
       <h3 class="reason-title">Developer eXperience</h3>
     </div>
  </div>
</div>

<style scoped>
.solution-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  text-align: center;
  gap: 1rem;
  width: 100%;
}

.solution-title {
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(135deg, var(--theme-color-oasis), var(--theme-color-peachOrange));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  gap: 2rem;
  justify-content: center;
}

.tanstack-logo {
  width: 80px;
  height: 80px;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
}

.reasons-container {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
  justify-content: center;
  padding-top: 1rem;
  width: 100%;
  max-width: 900px;
}

.reason-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  flex: 1;
  border: 3px solid transparent;
  position: relative;
}

.reason-item::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 3px;
  background: linear-gradient(135deg, var(--theme-color-oasis), var(--theme-color-peachOrange));
  border-radius: inherit;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: xor;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
}

.reason-item:nth-child(1)::before {
  background: linear-gradient(135deg, var(--theme-color-oasis), var(--theme-color-oasis));
}

.reason-item:nth-child(2)::before {
  background: linear-gradient(135deg, var(--theme-color-oasis), var(--theme-color-peachOrange));
}

.reason-item:nth-child(3)::before {
  background: linear-gradient(135deg, var(--theme-color-peachOrange), var(--theme-color-peachOrange));
}

.reason-icon {
  font-size: 3rem;
  margin-bottom: 0.3rem;
}

.reason-title {
  font-size: 1rem;
  font-weight: 900;
  color: var(--theme-color-cloudBurst);
  margin: 0;
}
</style>
