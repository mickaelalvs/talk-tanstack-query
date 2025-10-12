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
    <div class="flow-step idle" v-click>
      <span class="step-name">idle</span>
      <span class="step-desc">En attente</span>
    </div>
    <span class="flow-arrow" v-click>→</span>
    <div class="flow-step loading" v-after>
      <span class="step-name">loading</span>
      <span class="step-desc">Chargement initial</span>
    </div>
    <span class="flow-arrow" v-click>→</span>
    <div class="flow-branch">
      <div class="flow-step success" v-after>
        <span class="step-name">success</span>
        <span class="step-desc">Données chargées</span>
      </div>
      <span class="branch-separator" v-after >ou</span>
      <div class="flow-step error" v-after>
        <span class="step-name">error</span>
        <span class="step-desc">Erreur survenue</span>
      </div>
    </div>
    <span class="flow-arrow" v-click>→</span>
    <div class="flow-step fetching" v-after>
      <span class="step-name">fetching</span>
      <span class="step-desc">Rafraîchissement</span>
    </div>
  </div>
</div>

<style scoped>
.lifecycle-container {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 4rem;
}

.lifecycle-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  flex-wrap: nowrap;
  overflow-x: auto;
  border: 2px dotted var(--theme-color-oasis);
}

.flow-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  padding: 1rem 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-top: 3px solid transparent;
  min-width: 120px;
  flex-shrink: 0;
}

.flow-step.idle {
  border-top-color: #9E9E9E;
}

.flow-step.loading {
  border-top-color: #FFA500;
}

.flow-step.success {
  border-top-color: #28ca42;
}

.flow-step.error {
  border-top-color: #FF5F57;
}

.flow-step.fetching {
  border-top-color: var(--theme-color-oasis);
}

.step-name {
  font-family: 'Fira Code', monospace;
  font-weight: 700;
  color: var(--theme-color-cloudBurst);
  font-size: 0.9rem;
}

.step-desc {
  font-size: 0.75rem;
  color: var(--theme-color-cloudBurst);
  opacity: 0.7;
  text-align: center;
}

.flow-arrow {
  font-size: 1.5rem;
  color: var(--theme-color-oasis);
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
  color: var(--theme-color-cloudBurst);
  font-weight: 600;
  opacity: 0.6;
}

.example-section {
  background: rgba(255, 255, 255, 0.9);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border-bottom: 4px solid var(--theme-color-oasis);
  text-align: left;
}

.example-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--theme-color-cloudBurst);
  margin: 0 0 1rem 0;
  text-align: center;
}
</style>
