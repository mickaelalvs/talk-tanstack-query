---
title: "États d'une requête"
layout: basic-title
transition: fade
mdc: true
---

::title::
📊 États d'une requête

::default::

<div class="states-intro-container">  
  <div class="states-grid">
    <div class="state-card loading" v-click>
      <span class="state-icon">⏳</span>
      <code class="state-name">isLoading</code>
      <span class="state-desc">La requête démarre<br/>Pas de données disponibles</span>
    </div>
    <div class="state-card error" v-click>
      <span class="state-icon">❌</span>
      <code class="state-name">isError</code>
      <span class="state-desc">Une erreur est survenue<br/>Disponible dans <code>error</code></span>
    </div>
    <div class="state-card success" v-click>
      <span class="state-icon">✅</span>
      <code class="state-name">isSuccess</code>
      <span class="state-desc">Données chargées avec succès<br/>Disponibles dans <code>data</code></span>
    </div>
    <div class="state-card fetching" v-click>
      <span class="state-icon">🔄</span>
      <code class="state-name">isFetching</code>
      <span class="state-desc">Rafraîchissement en cours<br/>Données déjà présentes</span>
    </div>
  </div>
</div>

<style scoped>
.states-intro-container {
  max-width: 1000px;
  margin: 0 auto;
  padding-top: 4rem;
}

.section-subtitle {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: var(--theme-color-cloudBurst);
  margin: 0 0 2rem 0;
}

.states-grid {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.state-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2rem 0;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border-top: 4px solid transparent;
  flex: 1;
  min-width: 200px;
  max-width: 220px;
}

.state-card.loading {
  border-top-color: #FFA500;
}

.state-card.error {
  border-top-color: #FF5F57;
}

.state-card.success {
  border-top-color: #28ca42;
}

.state-card.fetching {
  border-top-color: var(--theme-color-oasis);
}

.state-icon {
  font-size: 2.5rem;
}

.state-name {
  font-family: 'Fira Code', monospace;
  font-weight: 700;
  color: var(--theme-color-cloudBurst);
  font-size: 0.8rem;
  background: rgba(0, 0, 0, 0.05);
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
}

.state-desc {
  font-size: 0.8rem;
  color: var(--theme-color-cloudBurst);
  text-align: center;
  line-height: 1.5;
}

.state-desc code {
  background: rgba(0, 183, 216, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9em;
  color: var(--theme-color-oasis);
  font-weight: 600;
}
</style>
