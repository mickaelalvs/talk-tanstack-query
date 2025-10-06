---
title: "Système de cache - Introduction"
layout: basic-title
transition: view-transition
mdc: true
---

::title::
🗄️ Système de cache

::default::

<div class="cache-intro-container">
  <div class="cache-intro">
    <div class="benefits-grid">
      <div class="benefit-item" v-click>
        <span class="benefit-icon">🚀</span>
        <span class="benefit-text">Évite les requêtes inutiles</span>
      </div>
      <div class="benefit-item" v-click>
        <span class="benefit-icon">⚡</span>
        <span class="benefit-text">Améliore la réactivité</span>
      </div>
      <div class="benefit-item" v-click >
        <span class="benefit-icon">🔄</span>
        <span class="benefit-text">Synchronisation automatique</span>
      </div>
    </div>
  </div>
  <div class="functioning-section" v-click>
    <h4 class="detail-title">Fonctionnement</h4>
    <ul class="detail-list">
      <li><code>queryKey</code> : identifiant unique de chaque requête</li>
      <li>Mise à jour auto lors du changement de clé ou invalidation</li>
      <li>Données réutilisées tant qu'elles sont fraîches</li>
    </ul>
  </div>
  <!-- TODO : Add schema to explain the caching process -->
</div>

<style scoped>
.cache-intro-container {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 5rem;
}

.section-subtitle {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: var(--theme-color-cloudBurst);
  margin: 0 0 1.5rem 0;
}

.benefits-grid {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.benefit-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  min-width: 180px;
  border-top: 4px solid var(--theme-color-oasis);
}

.benefit-icon {
  font-size: 2.5rem;
}

.benefit-text {
  font-size: 1rem;
  font-weight: 600;
  color: var(--theme-color-cloudBurst);
  text-align: center;
}

.functioning-section {
  background: rgba(255, 255, 255, 0.9);
  padding: 1.5rem;
  border-radius: 12px;
  border-bottom: 4px solid var(--theme-color-oasis);
}

.detail-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--theme-color-cloudBurst);
  margin: 0 0 1rem 0;
  text-align: center;
}

.detail-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.detail-list li {
  padding: 0.75rem 0;
  font-size: 1.1rem;
  color: var(--theme-color-cloudBurst);
}

code {
  background: rgba(0, 183, 216, 0.1);
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  font-family: 'Fira Code', monospace;
  font-size: 1em;
  color: var(--theme-color-oasis);
  font-weight: 600;
}
</style>
