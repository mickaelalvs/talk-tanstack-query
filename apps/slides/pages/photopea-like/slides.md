---
src: /pages/photopea-like/loading.md
transition: fade
---

---
title: Photopea - Call
layout: ticket
name: "Alexandre Moreau"
meta: "Développeur — outil graphique en ligne"
photo: "https://placehold.co/160x160?text=Alex"
ticketNumber: "#TSQ-2025-005"
priority: "low"
status: "open"
transition: fade
mdc: true
---

::message::

<Micka />

J'ai besoin de votre aide. Je maintiens depuis quelques années un outil comme photoshop en ligne sous Vue.js avec Pinia, et j'entends la hype me parler de TanStack Query tout autour de moi. Je ne peux me résoudre à ne pas l'utiliser, pouvez-vous m'aider à l'intégrer (si c'est possible) ?

::problem::

Est-ce que TanStack Query est vraiment adapté à une application graphique en ligne comme Photoshop ? Est-ce que ça pose problème que je sois sous Vue.js ? Et surtout, est-ce une bonne idée de migrer de Pinia vers TanStack Query ?

---
title: Photopea - Solution
layout: solution
ticketNumber: "#TSQ-2025-005"
solutionTitle: "Quand NE PAS utiliser TanStack Query"
concept: "Client State Only"
priority: "low"
status: "resolved"
transition: fade
mdc: true
---

::content::

<Section title="TanStack Query n'est PAS fait pour vous ! 🚫" icon="💡">

<div style="height: 10px;"></div>

Votre application d'édition graphique est **100% client-side** :

<br />

✅ **État du canvas** (layers, pixels, historique...)

✅ **Outils sélectionnés** (pinceau, gomme, texte...)

✅ **Sélections et transformations** en cours

✅ **Historique d'actions** (undo/redo)

✅ **Préférences utilisateur** locales

<br />

**<span style="color: #EF4444;">❌ Aucune donnée serveur !</span>** Tout est géré localement dans le navigateur.

</Section>

---
title: Photopea - Solution
layout: solution
ticketNumber: "#TSQ-2025-005"
solutionTitle: "Quand NE PAS utiliser TanStack Query"
concept: "Client State Only"
priority: "low"
status: "resolved"
transition: fade
mdc: true
---

::content::

<Micka />

<Section title="Concept TanStack Query" icon="⚡" variant="concept">

<div class="concept-description">

**<code style="font-size: 0.85em; color: #EF4444; background-color: #FEE2E2; padding: 2px 4px; border-radius: 4px;">TanStack Query n'est PAS un state manager "normal"</code>**

<br />

Comme on a indiqué, TanStack Query est conçu **spécifiquement** pour gérer le **Server State**  (Fetching, Caching, Synchronisation, Revalidation)

<br />

**Pour votre application d'édition graphique**, vous avez besoin d'un **state manager "normal"** :

<style>
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

.logo-item {
  animation: popIn 0.6s ease-out both;
}
</style>

<div style="display: flex; justify-content: center; align-items: center; gap: 30px; margin: 20px 0;">
  <div class="logo-item" style="text-align: center; animation-delay: 0.1s;">
    <img src="/assets/images/pinia.svg" alt="Pinia" style="width: 50px; height: 50px; filter: drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3));" />
    <div style="font-size: 0.7em; margin-top: 5px; color: #10B981; font-weight: bold;">Pinia ✅</div>
  </div>
  
  <div class="logo-item" style="text-align: center; animation-delay: 0.2s;">
    <img src="/assets/images/xstate.png" alt="Vuex" style="width: 50px; height: 50px; filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));" />
    <div style="font-size: 0.7em; margin-top: 5px;">X State</div>
  </div>
  
  <div class="logo-item" style="text-align: center; animation-delay: 0.3s;">
    <img src="/assets/images/zustand.svg" alt="Zustand" style="width: 50px; height: 50px; filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));" />
    <div style="font-size: 0.7em; margin-top: 5px;">Zustand</div>
  </div>
  
  <div class="logo-item" style="text-align: center; animation-delay: 0.4s;">
    <img src="/assets/images/redux.webp" alt="Redux" style="width: 50px; height: 50px; filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));" />
    <div style="font-size: 0.7em; margin-top: 5px;">Redux</div>
  </div>
  
  <div class="logo-item" style="text-align: center; animation-delay: 0.5s;">
    <img src="/assets/images/ngrx.png" alt="NgRx" style="width: 50px; height: 50px; filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));" />
    <div style="font-size: 0.7em; margin-top: 5px;">NgRx</div>
  </div>
</div>

</div>

</Section>

<!--
Lucas : Après il y a quand même des ças où elle pourrait arriver à en avoir besoin..
-->

---
title: Photopea - Solution
layout: solution
ticketNumber: "#TSQ-2025-005"
solutionTitle: "Quand NE PAS utiliser TanStack Query"
concept: "Client State Only"
priority: "low"
status: "resolved"
transition: fade
mdc: true
---

::content::

<Micka />

<Section title="Quand utiliser TanStack Query dans cette app ?" icon="🤔" variant="highlight">

<br />

Même dans une app d'édition graphique, **quelques fonctionnalités** pourraient bénéficier de TanStack Query :

<br />

**<span style="color: #10B981;">✅ Utilisez TanStack Query pour :</span>**

• **Charger des templates** depuis un serveur

• **Sauvegarder/charger des projets** depuis le cloud

• **Importer des images** depuis une API (Unsplash, Pexels...)

• **Partager des créations** et récupérer celles des autres

<br />

</Section>

---
title: Photopea - Solution
layout: solution
ticketNumber: "#TSQ-2025-005"
solutionTitle: "Quand NE PAS utiliser TanStack Query"
concept: "Client State Only"
priority: "low"
status: "resolved"
transition: fade
mdc: true
---

::content::

<Section title="Récapitulatif" icon="📋" variant="highlight">

<div style="height: 10px;"></div>

<div style="display: flex; gap: 5rem; align-items: flex-start;">
  <div>
    <strong><span style="color: #EF4444;">🚫 TanStack Query n'est PAS une solution miracle</span></strong>
    <div style="margin-bottom: 1rem; margin-top: 20px; ">
      <strong>1️⃣ Analyser votre application</strong>
      <div style="margin-left: 1rem; margin-top: 0.5rem;">
        <div>• Combien de données viennent du serveur ?</div>
        <div>• Combien sont gérées localement ?</div>
      </div>
    </div>
    <div style="margin-bottom: 1rem;">
      <strong>2️⃣ Choisir les bons outils</strong>
    </div>
    <div>
      <strong>3️⃣ Ne pas suivre aveuglément la hype</strong>
    </div>
  </div>

  <div style="flex: 0 0 200px; text-align: center;">
    <div style="background-color: #f0f0f0; border: 2px solid #ddd; width: 200px; height: 200px; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
      <img src="./assets/qrcode.png" alt="TanStack Query - Does this replace client state?" style="width: 100%; height: 100%; object-fit: contain; border-radius: 8px;" />
    </div>
    <small style="font-size: 0.7em; white-space: nowrap;">💡<a href="https://tanstack.com/query/v5/docs/framework/react/guides/does-this-replace-client-state" target="_blank" style="color: #00B7D8;">TanStack Query - Does this replace client state?</a></small>
  </div>
</div>

<div style="height: 10px;"></div>


</Section>
