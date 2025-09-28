---
title: List - Call
layout: ticket
name: "Pierre Martin"
meta: "Gérant syndic d'immeuble — gestion consommation"
photo: "https://placehold.co/160x160?text=Pierre"
ticketNumber: "#TSQ-2024-003"
priority: "high"
status: "open"
transition: view-transition
mdc: true
---

::message::

Je suis le gérant d'un syndic d'immeuble, et j'ai donc à disposition une application que me permet de suivre la consommation des différentes personnes dans l'immeuble, mais le code devient un peu fouillit avec tout les appels réseaux que je doit gérer, et je ne parle même pas des états de chargement qui arrivent de partout. J'ai cru comprendre que TanStack Query pourrais m'aider, pouvez vous me guider ?

::problem::

Comment simplifier la gestion des appels réseau et des états de chargement dans une application de suivi de consommation d'eau avec TanStack Query ?

---
title: List - Demo - Data graph
layout: code-server
transition: view-transition
---

<CodeServer path="water-meter" />

---
title: List - Solution
layout: solution
ticketNumber: "#TSQ-2024-003"
solutionTitle: "Simplification de la gestion des données de consommation"
concept: "useQuery + React Query Devtools"
priority: "high"
status: "resolved"
transition: view-transition
mdc: true
---

::content::

<Section v-click="1" v-show="$clicks === 1" title="Explication" icon="💡">

TanStack Query va considérablement simplifier votre application de suivi de consommation !

Plus besoin de gérer manuellement les appels réseau et les états de chargement.

Chaque compteur d'eau aura sa propre query, et TanStack Query s'occupera de tout le reste.

**Problème résolu :** Fini les états de chargement qui "arrivent de partout" !

</Section>

<Section v-click="2" v-show="$clicks === 2" title="Concept TanStack Query" icon="⚡" variant="concept">

<div class="concept-highlight">
    <span class="concept-label">Concept clé :</span>
    <span class="concept-name">useQuery + React Query Devtools</span>
</div>
<div class="concept-description">

**useQuery** pour chaque compteur avec des clés uniques :

```javascript
const { data: consumption, isLoading, error } = useQuery({
  queryKey: ['consumption', meterId],
  queryFn: () => fetchConsumption(meterId)
})
```

**React Query Devtools** pour débugger facilement toutes vos queries en temps réel.

</div>

</Section>

<Section v-click="3" v-show="$clicks === 3" title="Avantages" icon="🎯" variant="highlight">

- **Centralisation** : Tous les états de chargement gérés au même endroit
- **Debugging** : Devtools pour voir l'état de toutes vos queries
- **Performance** : Cache intelligent pour éviter les requêtes inutiles
- **Simplicité** : Code plus lisible et maintenable

</Section>