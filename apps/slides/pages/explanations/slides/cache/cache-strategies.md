---
title: "Stratégies de cache"
layout: basic-title
transition: fade
mdc: true
---

::title::
🎯 Stratégies de cache

::default::

<div class="strategies-container">
  <div class="strategies-row" v-click>
    <div class="strategy-item">
      <span class="strategy-icon">👁️</span>
      <h4 class="strategy-name">refetchOnWindowFocus</h4>
    </div>
    <div class="strategy-item">
      <span class="strategy-icon">📡</span>
      <h4 class="strategy-name">refetchOnReconnect</h4>
    </div>
    <div class="strategy-item">
      <span class="strategy-icon">🔄</span>
      <h4 class="strategy-name">Background Refetching</h4>
    </div>
    <div class="strategy-item">
      <span class="strategy-icon">⚡</span>
      <h4 class="strategy-name">Optimistic Updates</h4>
    </div>
  </div>
  <div class="best-practices" v-click>
    <h4 class="practices-title">✅ Bonnes pratiques</h4>
    <ul class="practices-list">
      <li>Utiliser des clés stables et descriptives : <code>['users', { page, filter }]</code></li>
      <li>Adapter <code>staleTime</code> selon la fréquence de mise à jour des données</li>
    </ul>
  </div>
</div>

<style scoped>
.strategies-container {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-top: 6rem;
}

.strategies-row {
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.strategy-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  animation: popIn 0.5s ease-out backwards;
}

.strategy-item:nth-child(1) { animation-delay: 0.1s; }
.strategy-item:nth-child(2) { animation-delay: 0.2s; }
.strategy-item:nth-child(3) { animation-delay: 0.3s; }
.strategy-item:nth-child(4) { animation-delay: 0.4s; }

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.strategy-icon {
  font-size: 2rem;
}

.strategy-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--theme-color-cloudBurst);
  margin: 0;
  font-family: 'Fira Code', monospace;
  text-align: center;
  max-width: 180px;
}

.best-practices {
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border-bottom: 4px solid var(--theme-color-oasis);
  border-top: 4px solid var(--theme-color-oasis);
}

.practices-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--theme-color-cloudBurst);
  margin: 0 0 1.5rem 0;
  text-align: center;
}

.practices-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.practices-list li {
  padding: 0.75rem 0;
  font-size: 1.05rem;
  color: var(--theme-color-cloudBurst);
  line-height: 1.6;
}

code {
  background: rgba(0, 0, 0, 0.05);
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 0.95em;
  color: var(--theme-color-oasis);
  font-weight: 600;
}
</style>
