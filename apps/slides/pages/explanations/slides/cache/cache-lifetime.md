---
title: "Durée de vie du cache"
layout: basic-title
transition: fade
mdc: true
---

::title::
⏱️ Durée de vie du cache

::default::

<div class="lifetime-container">
  <div class="config-section">
    <div class="config-item" v-click>
      <div class="config-header">
        <code class="config-key">staleTime</code>
        <span class="config-badge">Fraîcheur</span>
      </div>
      <p class="config-desc">Durée pendant laquelle les données sont considérées "fraîches"</p>
    </div>
    <div class="config-item" v-click>
      <div class="config-header">
        <code class="config-key">cacheTime</code>
        <span class="config-badge">Mémoire</span>
      </div>
      <p class="config-desc">Durée pendant laquelle les données "obsolètes" restent en mémoire</p>
    </div>
  </div>
  <div class="timeline-visual" v-click>
    <div class="timeline">
      <div class="timeline-segment fresh">
        <span class="timeline-label">Fresh</span>
        <span class="timeline-duration">staleTime</span>
      </div>
      <div class="timeline-segment stale">
        <span class="timeline-label">Stale</span>
        <span class="timeline-duration">cacheTime - staleTime</span>
      </div>
      <div class="timeline-segment removed">
        <span class="timeline-label">Removed</span>
      </div>
    </div>
  </div>
</div>

<style scoped>
.lifetime-container {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 4rem;
}

.config-section {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  justify-content: center;
}

.config-item {
  background: rgba(255, 255, 255, 0.9);
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border-bottom: 4px solid var(--theme-color-oasis);
  flex: 1;
  max-width: 400px;
}

.config-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.config-key {
  font-family: 'Fira Code', monospace;
  font-weight: 700;
  color: var(--theme-color-oasis);
  font-size: 1.1rem;
  background: rgba(0, 183, 216, 0.1);
  padding: 0.3rem 0.7rem;
  border-radius: 8px;
}

.config-badge {
  background: var(--theme-color-peachOrange);
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.config-desc {
  font-size: 0.9rem;
  color: var(--theme-color-cloudBurst);
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
}

.config-example {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 0.6rem;
}

.config-example pre {
  margin: 0;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
}

.config-example code {
  color: var(--theme-color-cloudBurst);
}

.timeline-visual {
  background: rgba(255, 255, 255, 0.9);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.timeline {
  display: flex;
  height: 70px;
  border-radius: 12px;
  overflow: hidden;
}

.timeline-segment {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  padding: 0.75rem;
}

.timeline-segment.fresh {
  flex: 1;
  background: linear-gradient(135deg, #28ca42, #4dd865);
}

.timeline-segment.stale {
  flex: 1;
  background: linear-gradient(135deg, #FFD700, #FFA500);
}

.timeline-segment.removed {
  flex: 0.5;
  background: linear-gradient(135deg, #FF5F57, #FF8E8E);
}

.timeline-label {
  font-weight: 700;
  color: white;
  font-size: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.timeline-duration {
  font-size: 0.8rem;
  color: white;
  opacity: 0.9;
  font-family: 'Fira Code', monospace;
}
</style>
