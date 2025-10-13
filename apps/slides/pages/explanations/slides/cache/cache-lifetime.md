---
title: "Durée de vie du cache"
layout: basic-title
transition: fade
mdc: true
---

::title::

📖 Un peu de vocabulaire sur les états

::default::

<Micka /> 

<div class="lifetime-container">
  <!-- Section 1: États de fraîcheur -->
  <div class="states-section" v-click>
    <h3 class="section-title">États de fraîcheur des données (Data Freshness)</h3>
    <div class="states-grid">
      <div class="state-card fresh-state">
        <span class="state-name">fresh</span>
        <span class="state-desc">Données à jour, pas de refetch automatique</span>
      </div>
      <div class="state-card stale-state">
        <span class="state-name">stale</span>
        <span class="state-desc">Données potentiellement obsolètes, refetch possible</span>
      </div>
    </div>
  </div>

  <!-- Section 2: États d'activité -->
  <div class="states-section" v-click>
    <h3 class="section-title">États d'activité (Activity States)</h3>
    <div class="states-grid">
      <div class="state-card active-state">
        <span class="state-name">active</span>
        <span class="state-desc">Données observées par au moins un composant</span>
      </div>
      <div class="state-card inactive-state">
        <span class="state-name">inactive</span>
        <span class="state-desc">Données en cache mais plus observées</span>
      </div>
    </div>
  </div>

  <!-- Section 3: États du cache -->
  <div class="states-section" v-click>
    <h3 class="section-title">États du cache (Cache States)</h3>
    <div class="states-grid">
      <div class="state-card cached-state">
        <span class="state-name">cached</span>
        <span class="state-desc">Données présentes en cache</span>
      </div>
      <div class="state-card removed-state">
        <span class="state-name">removed</span>
        <span class="state-desc">Données supprimées du cache (après gcTime)</span>
      </div>
    </div>
  </div>
</div>

<style scoped>
.lifetime-container {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 5rem;
}

/* Sections */
.states-section {
  background: rgba(255, 255, 255, 0.95);
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.section-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--theme-color-cloudBurst);
  margin: 0 0 0.6rem 0;
  text-align: center;
}

/* States Grid */
.states-grid {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.state-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  padding: 0.8rem 1.8rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-top: 3px solid transparent;
  min-width: 200px;
  flex: 1;
}

.state-card.fresh-state {
  border-top-color: #28ca42;
}

.state-card.stale-state {
  border-top-color: #FFD700;
}

.state-card.active-state {
  border-top-color: #00B4D8;
}

.state-card.inactive-state {
  border-top-color: #9E9E9E;
}

.state-card.cached-state {
  border-top-color: #87CEEB;
}

.state-card.removed-state {
  border-top-color: #FF5F57;
}

.state-name {
  font-family: 'Fira Code', monospace;
  font-weight: 700;
  color: var(--theme-color-cloudBurst, #2C3E50);
  font-size: 0.8rem;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
}

.fresh-state .state-name {
  background-color: #E8F5E9;
}

.stale-state .state-name {
  background-color: #FFF9E6;
}

.active-state .state-name {
  background-color: #E0F7FA;
}

.inactive-state .state-name {
  background-color: #F5F5F5;
}

.cached-state .state-name {
  background-color: #E1F5FE;
}

.removed-state .state-name {
  background-color: #FFEBEE;
}

.state-desc {
  font-size: 0.7rem;
  color: var(--theme-color-cloudBurst, #2C3E50);
  opacity: 0.7;
  text-align: center;
  line-height: 1.3;
  white-space: nowrap;
}
</style>

---
title: "Cycle complet du cache"
layout: basic-title
transition: fade
mdc: true
---

::title::

🔄 Exemple de cycle complet du cache

::default::

<Micka />

<!-- Flow cycle -->
<div class="flow-section">
  <div class="flow-visual">
    <div class="flow-row">
      <div class="flow-box fresh-box">
        <div class="box-icon">✓</div>
        <div class="box-name">fresh</div>
        <div class="box-hint">staleTime</div>
      </div>
      <div class="flow-arrow-h">→</div>
      <div class="flow-box stale-box">
        <div class="box-icon">⏱</div>
        <div class="box-name">stale</div>
        <div class="box-hint">obsolète</div>
      </div>
      <div class="flow-arrow-h">→</div>
      <div class="flow-box inactive-box">
        <div class="box-icon">💤</div>
        <div class="box-name">inactive</div>
        <div class="box-hint">non observé</div>
      </div>
      <div class="flow-arrow-h">→</div>
      <div class="flow-box removed-box">
        <div class="box-icon">🗑</div>
        <div class="box-name">removed</div>
        <div class="box-hint">après gcTime si inactive</div>
      </div>
    </div>
  </div>
</div>


<style scoped>
/* Flow Section */
.flow-section {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.98));
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(0, 180, 216, 0.1);
}

.flow-visual {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

.flow-row {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.flow-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  padding: 1.2rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 120px;
  text-align: center;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.flow-box:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.box-icon {
  font-size: 1.5rem;
  line-height: 1;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.box-name {
  font-family: 'Fira Code', monospace;
  font-weight: 700;
  font-size: 0.95rem;
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.box-hint {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
  font-style: italic;
}

.flow-box.fresh-box {
  background: linear-gradient(135deg, #28ca42 0%, #4dd865 100%);
}

.flow-box.stale-box {
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
}

.flow-box.inactive-box {
  background: linear-gradient(135deg, #9E9E9E 0%, #BDBDBD 100%);
}

.flow-box.removed-box {
  background: linear-gradient(135deg, #FF5F57 0%, #FF8E8E 100%);
}

.flow-arrow-h {
  font-size: 2rem;
  color: var(--theme-color-oasis, #00B4D8);
  font-weight: bold;
  line-height: 1;
}
</style>
