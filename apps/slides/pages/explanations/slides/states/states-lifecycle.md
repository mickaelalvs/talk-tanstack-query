---
title: "Cycle de vie d'une requête"
layout: basic-title
transition: fade
mdc: true
---

::title::
🔄 Cycle de vie d'une requête

::default::

<div class="lifecycle-container">
  <div class="lifecycle-flow">
    <!-- Étape 1: PENDING + FETCHING -->
    <div class="flow-step loading" v-click>
      <span class="step-name">pending</span>
      <span class="step-plus">+</span>
      <span class="step-name">fetching</span>
      <span class="step-desc">Chargement initial</span>
    </div>
    <span class="flow-arrow" v-click>→</span>
    <!-- Étape 2: SUCCESS ou ERROR -->
    <div class="flow-branch">
      <div class="flow-step success" v-after>
        <span class="step-name">success</span>
        <span class="step-plus">+</span>
        <span class="step-name">idle</span>
        <span class="step-desc">Données en cache (Fresh)</span>
      </div>
      <span class="branch-separator" v-after>ou</span>
      <div class="flow-step error" v-after>
        <span class="step-name">error</span>
        <span class="step-plus">+</span>
        <span class="step-name">idle</span>
        <span class="step-desc">Erreur survenue</span>
      </div>
    </div>
    <span class="flow-arrow" v-click>→</span>
    <!-- Étape 3: Après staleTime -->
    <div class="flow-step success-stale" v-after>
      <span class="step-name">success</span>
      <span class="step-plus">+</span>
      <span class="step-name">idle</span>
      <span class="step-desc">Données obsolètes (Stale)</span>
    </div>
    <span class="flow-arrow" v-click>→</span>
    <!-- Étape 4: Refetch -->
    <div class="flow-step fetching" v-after>
      <span class="step-name">success</span>
      <span class="step-plus">+</span>
      <span class="step-name">fetching</span>
      <span class="step-desc">Rafraîchissement</span>
    </div>
    <span class="flow-arrow" v-click>→</span>
    <!-- Étape 5: Removed -->
    <div class="flow-step removed" v-after>
      <span class="step-name">removed</span>
      <span class="step-desc">Cache vidé (gcTime)</span>
    </div>
    <!-- Paused en bas -->
    <div class="flow-step paused standalone" v-click>
      <span class="step-name">paused</span>
      <span class="step-desc">Pause réseau</span>
      <span class="step-note">Remplace "fetching"</span>
    </div>
  </div>
</div>

<style scoped>
.lifecycle-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 4rem;
}

.lifecycle-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 12px;
  flex-wrap: nowrap;
  overflow-x: auto;
  position: relative;
  padding-bottom: 10rem;
  padding-top: 5rem;
}

.flow-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-top: 3px solid transparent;
  min-width: 140px;
  flex-shrink: 0;
  margin: 0.5rem
}

.flow-step.loading {
  border-top-color: #FFD700;
}

.flow-step.success {
  border-top-color: #28ca42;
}

.flow-step.success-stale {
  border-top-color: #FFE4B5;
}

.flow-step.error {
  border-top-color: #FF5F57;
}

.flow-step.fetching {
  border-top-color: #87CEEB;
}

.flow-step.paused {
  border-top-color: #9C27B0;
}

.flow-step.removed {
  border-top-color: #D3D3D3;
}

.flow-step.standalone {
  position: absolute;
  bottom: 4rem;
  left: 0;
}

.step-name {
  font-family: 'Fira Code', monospace;
  font-weight: 700;
  color: var(--theme-color-cloudBurst, #2C3E50);
  font-size: 0.65rem;
}

.step-plus {
  font-size: 0.5rem;
  color: var(--theme-color-cloudBurst, #2C3E50);
  opacity: 0.5;
  font-weight: 600;
}

.step-desc {
  font-size: 0.7rem;
  color: var(--theme-color-cloudBurst, #2C3E50);
  opacity: 0.7;
  text-align: center;
  margin-top: 0.2rem;
}

.step-note {
  font-size: 0.65rem;
  color: var(--theme-color-cloudBurst, #2C3E50);
  opacity: 0.5;
  font-style: italic;
  text-align: center;
}

.flow-arrow {
  font-size: 1.5rem;
  color: var(--theme-color-oasis, #00B4D8);
  font-weight: bold;
  flex-shrink: 0;
}

.flow-branch {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  flex-shrink: 0;
}

.branch-separator {
  font-size: 0.75rem;
  color: var(--theme-color-cloudBurst, #2C3E50);
  font-weight: 600;
  opacity: 0.6;
}
</style>