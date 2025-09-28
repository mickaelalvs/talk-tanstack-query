---
title: Big Latency - Call
layout: ticket
name: "Dr. Claire Bernard"
meta: "Développeuse — application santé rurale"
photo: "https://placehold.co/160x160?text=Claire"
ticketNumber: "#TSQ-2024-006"
priority: "high"
status: "open"
transition: view-transition
mdc: true
---

::message::

Je suis le créateur d'une application qui à pour but d'aider les soignants en zone rurale dans la gestion de leur prise de rendez-vous. J'ai déjà TanStack Query dans mon application, cela marche vraiment bien et ça me permet de me passer de store. Cependant, je me suis confronté à un problème, dans des milieux ruraux un peu reculé, l'accès au reseau est parfait un peut chaotique... Vais-je devoir me passer de TanStack Query ?

::problem::

Comment gérer les problèmes de connectivité réseau intermittente en zone rurale avec TanStack Query sans perdre les données utilisateur ?

---
title: Big Latency - Demo - Optimistic update
layout: code-server
transition: view-transition
---

<CodeServer path="itinerant-healthcare" />

---
title: Big Latency - Persist query client
transition: view-transition
---

Example persist query client pour pouvoir garder les data hors connexion

---
title: Big Latency - Mutation queue
transition: view-transition
---

Mutation queue qui permet de relancer les mutations quand la connexion reviens
Utilisation du online manager

---
title: Big Latency - Conclusion
transition: view-transition
---

- Optimistic update simplifié => Single source of truth
- Persist Query Client => DL les data une seule fois
- Online Manager + Mutation queue => Ratrapper les mutations
