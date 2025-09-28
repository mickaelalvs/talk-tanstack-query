---
title: Next Js - Call
layout: ticket
name: "Thomas Rousseau"
meta: "Développeur full-stack — migration Next.js"
photo: "https://placehold.co/160x160?text=Thomas"
ticketNumber: "#TSQ-2024-007"
priority: "medium"
status: "open"
transition: view-transition
mdc: true
---

::message::

Je suis conquis par TanStack Query, la facilité d'utilisation et la puissance de l'outils ! Après plusieurs application uniquement client side, je suis en train de construire une application avec Next Js et j'aimerai beaucoup pouvoir profiter des React Server Component, du SSR et de TanStack... Dites moi que c'est possible.

::problem::

Comment intégrer TanStack Query avec Next.js pour profiter des React Server Components et du SSR tout en gardant la puissance de TanStack Query ?

---
title: Next Js - useSuspenseQuery
transition: view-transition
---

Montrer un exemple avec useSuspenseQuery, qui permet d'intéragir directement avec les `loading.tsx` et `error.tsx` de NextJs
Même si ça ne sert pas qu'a ça


---
title: Next Js - Client Hydration
transition: view-transition
---

Utilisation du HydrationBoundaries avec le helper dehydrate pour permettre de fetch coté serveur tout en gardant le cache

Info importante, possibilité de stream du fait que les query en 'pending' sont serializable 

---
title: Next Js - Experimental ReactQueryStreamedHydration
transition: view-transition
---

Utilisation de ReactQueryStreamedHydration pour une meilleur DX pour faire du fetching de data suspensed coté server (il faut que je creuse la doc j'ai pas full compris encore)