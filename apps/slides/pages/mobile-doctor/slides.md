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
title: Big Latency - Solution
layout: solution
ticketNumber: "#TSQ-2024-006"
solutionTitle: "TanStack Query pour les environnements offline"
concept: "Optimistic Updates + Offline Support"
priority: "high"
status: "resolved"
mdc: true
---

::content::

<Section title="TanStack Query est PARFAIT pour vous ! ✅" icon="💡">

<br /><br />

<div style="display: flex; justify-content: space-between; gap: 0rem; text-align: center;">
  <div>
    <div style="font-size: 3rem; margin-bottom: 0.5rem;">⚡</div>
    <div><strong><span style="color: #10B981; background-color: #D1FAE5; padding: 8px 10px; border-radius: 4px;">Optimistic Updates</span></strong></div>
  </div>
  <div>
    <div style="font-size: 3rem; margin-bottom: 0.5rem;">💾</div>
    <div><strong><span style="color: #10B981; background-color: #D1FAE5; padding: 8px 10px; border-radius: 4px;">Persist Query Client</span></strong></div>
  </div>
  <div>
    <div style="font-size: 3rem; margin-bottom: 0.5rem;">🔄</div>
    <div><strong><span style="color: #10B981; background-color: #D1FAE5; padding: 8px 10px; border-radius: 4px;">Mutation Queue + Retry</span></strong></div>
  </div>
  <div>
    <div style="font-size: 3rem; margin-bottom: 0.5rem;">📡</div>
    <div><strong><span style="color: #10B981; background-color: #D1FAE5; padding: 8px 10px; border-radius: 4px;">Network Mode</span></strong></div>
  </div>
</div>

<br /><br />

</Section>

---
title: Big Latency - Solution
layout: solution
ticketNumber: "#TSQ-2024-006"
solutionTitle: "TanStack Query pour les environnements offline"
concept: "Optimistic Updates + Offline Support"
priority: "high"
status: "resolved"
mdc: true
---

::content::

<Section title="Optimistic Updates : mettre à jour l'UI avant la réponse du serveur" icon="⚡" variant="concept">

<div class="concept-description">

```tsx{all}{lines:true, class: '!children:text-[10px] !m-0'}
// 1️⃣ AVANT la requête : mise à jour optimiste
onMutate: async (variables, context) => {
  // Annuler les requêtes en cours pour éviter les conflits
  await context.client.cancelQueries({ queryKey: ['appointments'] });
  // Sauvegarder l'état actuel (pour rollback si erreur)
  const previous = context.client.getQueryData(['appointments']);
  // Mettre à jour le cache immédiatement
  context.client.setQueryData(['appointments'], (old) => 
    [...old, { ...variables, id: 'temp-123', status: 'pending' }]
  );

  return { previous }; // Retourner le context pour onError 
},
```

<div style="height: 10px;"></div>

</div>

</Section>

---
title: Big Latency - Solution
layout: solution
ticketNumber: "#TSQ-2024-006"
solutionTitle: "TanStack Query pour les environnements offline"
concept: "Optimistic Updates + Offline Support"
priority: "high"
status: "resolved"
mdc: true
---

::content::

<Section title="Optimistic Updates : mettre à jour l'UI avant la réponse du serveur" icon="⚡" variant="concept">

<div class="concept-description">

```tsx{all}{lines:true, class: '!children:text-[10px] !m-0'}
// 1️⃣ AVANT la requête : mise à jour optimiste
onMutate: async (variables, context) => {...},

// 2️⃣ En cas d'ERREUR : rollback
onError: (err, variables, context) => {
  // Restaurer l'état précédent
  context.client.setQueryData(['appointments'], context.previous);
},
```

</div>

</Section>

---
title: Big Latency - Solution
layout: solution
ticketNumber: "#TSQ-2024-006"
solutionTitle: "TanStack Query pour les environnements offline"
concept: "Optimistic Updates + Offline Support"
priority: "high"
status: "resolved"
mdc: true
---

::content::

<Section title="Optimistic Updates : mettre à jour l'UI avant la réponse du serveur" icon="⚡" variant="concept">

<div class="concept-description">

```tsx{all}{lines:true, class: '!children:text-[10px] !m-0'}
// 1️⃣ AVANT la requête : mise à jour optimiste
onMutate: async (variables, context) => {...},

// 2️⃣ En cas d'ERREUR : rollback
onError: (err, variables, context) => {...},

// 3️⃣ En cas de SUCCÈS : remplacer par les vraies données
onSuccess: (data) => {
  context.client.setQueryData(['appointments'], (old) =>
    old.map(apt => apt.id === 'temp-123' ? data : apt)
  );
}
```

</div>

</Section>

<!--
• UX instantanée avec `onMutate`

• Rollback automatique avec `onError`

• Single source of truth
-->

---
title: Big Latency - Solution
layout: solution
ticketNumber: "#TSQ-2024-006"
solutionTitle: "TanStack Query pour les environnements offline"
concept: "Optimistic Updates + Offline Support"
priority: "high"
status: "resolved"
mdc: true
---

::content::

<Section title="Persist Query Client : sauvegarder le cache pour l'avoir hors connexion" icon="💾" variant="concept">

```tsx{all|1-2,9|11-17}{lines:true, class: '!children:text-[10px] !m-0 '}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 heures
    },
  },
})

const persister = createSyncStoragePersister({ storage: window.localStorage })

<PersistQueryClientProvider client={queryClient} persister={persister}>
  <App />
</PersistQueryClientProvider>
```

<br />

**<span style="color: #10B981;">✅ Le médecin charge les données au bureau et les a partout !</span>**

</Section>

<!--
• Charger les données une fois au bureau

• Disponibles partout, même offline

• localStorage ou IndexedDB
-->

---
title: Big Latency - Solution
layout: solution
ticketNumber: "#TSQ-2024-006"
solutionTitle: "TanStack Query pour les environnements offline"
concept: "Optimistic Updates + Offline Support"
priority: "high"
status: "resolved"
mdc: true
---

::content::

<Section title="Mutation Queue + Retry : les mutations se mettent en pause si pas de connexion" icon="💾" variant="concept">

<div style="height: 10px;"></div>

```tsx{all|3-10}{lines:true}
const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      // Les mutations échouées sont mises en file d'attente
      networkMode: 'offlineFirst', // ou 'online' par défaut
      retry: 3, // Réessayer 3 fois
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
})
```

<div style="height: 10px;"></div>

</Section>

<!--
• Mutations en pause si offline

• Relance automatique quand connexion revient

• Fonctionne même après refresh
-->

---
title: Big Latency - Solution
layout: solution
ticketNumber: "#TSQ-2024-006"
solutionTitle: "TanStack Query pour les environnements offline"
concept: "Optimistic Updates + Offline Support"
priority: "high"
status: "resolved"
mdc: true
---

::content::

<Section title="Mutation Queue + Retry : les mutations se mettent en pause si pas de connexion" icon="💾" variant="concept">

<br />

**<span style="color: #10B981;">Comportement automatique :</span>**
<div style="height: 10px;"></div>

• Mutation lancée sans connexion → **mise en pause** ⏸️
<div style="height: 10px;"></div>

• Connexion revenue → **relance automatique** ▶️
<div style="height: 10px;"></div>

• Même après un **refresh de page** (avec persist) ! 🔄

<div style="height: 10px;"></div>

<div style="text-align: center; margin-top: 10px;">
  <small style="font-size: 0.7em;">💡 <strong>TanStack Query détecte automatiquement le statut online/offline</strong></small>
</div>

<br />

</Section>

---
title: Big Latency - Solution
layout: solution
ticketNumber: "#TSQ-2024-006"
solutionTitle: "TanStack Query pour les environnements offline"
concept: "Optimistic Updates + Offline Support"
priority: "high"
status: "resolved"
mdc: true
---

::content::

<Section title="NetworkMode : offlineFirst, les 3 modes de réseau disponibles" icon="🌐" variant="tip">

<div style="height: 10px;"></div>

<div style="display: flex; gap: 6rem; align-items: flex-start;">
  <div>
    <strong>1️⃣ <code style="background-color: #f3f4f6; color: #374151; padding: 2px 6px; border-radius: 4px; font-size: 0.8em;">online</code> (défaut)</strong>
    <div style="font-size: 0.9em;">
    • Les queries/mutations ne se lancent <strong>que si connecté</strong> <br />
    • Si pas de connexion → erreur immédiate
    </div>
    <div style="height: 10px;"></div>
    <strong>2️⃣ <code style="background-color: #f3f4f6; color: #374151; padding: 2px 6px; border-radius: 4px; font-size: 0.8em;">always</code></strong>
    <div style="font-size: 0.9em;">
    • Les queries/mutations se lancent <strong>toujours</strong> <br />
    • Même sans connexion (pratique pour cache-only)
    </div>
    <div style="height: 10px;"></div>
    <strong>3️⃣ <code style="background-color: #f3f4f6; color: #374151; padding: 2px 6px; border-radius: 4px; font-size: 0.8em;">offlineFirst</code> ⭐</strong>
    <div style="font-size: 0.9em;">
    • <strong>Essaye</strong> la requête même offline <br />
    • Si échec réseau → utilise le cache <br />
    • Parfait avec une PWA et un service worker !
    </div>
  </div>

  <div style="flex: 0 0 200px; text-align: center;">
    <div style="background-color: #f0f0f0; border: 2px solid #ddd; width: 200px; height: 200px; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
      <img src="./assets/qrcode.png" alt="Offline React Query par TkDodo" style="width: 100%; height: 100%; object-fit: contain; border-radius: 8px;" />
    </div>
    <small style="font-size: 0.7em; white-space: nowrap;">💡<a href="https://tkdodo.eu/blog/offline-react-query" target="_blank" style="color: #00B7D8; font-weight: bold;">Offline React Query par TkDodo</a></small>
  </div>
</div>

</Section>

<!--
• Avec PWA + Service Worker

• App qui fonctionne vraiment offline
-->
