---
title: Base Case - Call 
layout: ticket
name: "Marie Dubois"
meta: "Développeuse frontend — application de voyage"
photo: "https://placehold.co/160x160?text=Marie"
ticketNumber: "#TSQ-2024-002"
priority: "medium"
status: "open"
transition: view-transition
mdc: true
---

::message::

J'ai une application de préparation de voyage, ou l'on peut créer un voyage à partir des différentes villes que l'on veut visiter, et l'application nous permettra de nous aider à préparer ces voyages. Pour l'instant j'ai la liste des villes et des voyages, et j'aimerai bien savoir comment je pourrais inclure TanStack Query dans cette application.

::problem::

Comment intégrer TanStack Query dans une application de planification de voyage pour gérer efficacement les données des villes et des voyages ?

---
title: Base Case - Demo
layout: code-server
transition: view-transition
---

<CodeServer path="trip-planner" />

---
title: Base Case - Solution
layout: solution
ticketNumber: "#TSQ-2024-002"
solutionTitle: "Intégration TanStack Query dans Trip Planner"
concept: "useQuery + QueryClient"
priority: "medium"
status: "resolved"
transition: view-transition
mdc: true
---

::content::

Coucou

---
title: Base Case - Solution
layout: solution
ticketNumber: "#TSQ-2024-002"
solutionTitle: "Intégration TanStack Query dans Trip Planner"
concept: "useQuery + QueryClient"
priority: "medium"
status: "resolved"
transition: view-transition
mdc: true
---

::content::

<Section title="Explication" icon="💡">

Pour votre application de planification de voyage, TanStack Query va révolutionner la gestion des données !

Au lieu de gérer manuellement les états de chargement, les erreurs et le cache, vous pourrez simplement utiliser `useQuery` pour récupérer vos villes et voyages.

**Avant :** Gestion manuelle des états, du cache, des erreurs...

**Après :** Une seule ligne de code pour récupérer et gérer vos données !

</Section>

<Section v-click="2" v-show="$clicks === 2" title="Concept TanStack Query" icon="⚡" variant="concept">

<div class="concept-highlight">
    <span class="concept-label">Concept clé :</span>
    <span class="concept-name">useQuery + QueryClient</span>
</div>
<div class="concept-description">

**useQuery** est le hook principal de TanStack Query. Il gère automatiquement :

- Le cache des données
- Les états de chargement (isLoading, isFetching)
- La gestion des erreurs (error)
- La revalidation automatique
- L'invalidation intelligente

**QueryClient** centralise la configuration et permet de partager le cache entre tous vos composants.

</div>

</Section>

<Section v-click="3" v-show="$clicks === 3" title="Avantages" icon="🎯" variant="highlight">

- **Simplicité** : Plus besoin de gérer manuellement les états
- **Performance** : Cache intelligent et revalidation optimisée
- **UX** : États de chargement et erreurs gérés automatiquement
- **Maintenabilité** : Code plus propre et plus lisible

</Section>