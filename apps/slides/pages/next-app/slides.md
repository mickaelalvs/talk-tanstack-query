---
title: Next.js - Call
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

Je suis conquis par TanStack Query, la facilité d'utilisation et la puissance de l'outils ! Après plusieurs application uniquement client side, je suis en train de construire une application avec Next.js et j'aimerai beaucoup pouvoir profiter des React Server Component, du SSR et de TanStack... Dites moi que c'est possible.

::problem::

Comment intégrer TanStack Query avec Next.js pour profiter des React Server Components et du SSR tout en gardant la puissance de TanStack Query ?

---
title: Next.js - Solution
layout: solution
ticketNumber: "#TSQ-2024-007"
solutionTitle: "TanStack Query avec Next.js"
concept: "SSR + Suspense + Hydration"
priority: "medium"
status: "resolved"
mdc: true
---

::content::

<Section title="TanStack Query ❤️ Next.js" icon="💡">

<div style="height: 10px;"></div>

**<span style="color: #10B981;">✅ Oui, c'est totalement possible !</span>** TanStack Query fonctionne parfaitement avec Next.js ou n'importe quel framework SSR :

<br /><br />

**<span style="color: #3B82F6;">🎯 Deux approches principales :</span>**

<br />

<div style="display: flex; gap: 3rem; align-items: flex-start;">

<div style="flex: 1;">

**1️⃣ useSuspenseQuery + loading.tsx**

• Parfait pour l'App Router de Next.js

• Déclenche automatiquement les loading.tsx

• Code simple et élégant

</div>

<div style="flex: 1;">

**2️⃣ Prefetch côté serveur + Hydration**

• Fetch les données dans un Server Component

• Hydrate le cache côté client

• Meilleur pour le SEO et les performances

</div>

</div>

</Section>

---
title: Next.js - Solution
layout: solution
ticketNumber: "#TSQ-2024-007"
solutionTitle: "TanStack Query avec Next.js"
concept: "SSR + Suspense + Hydration"
priority: "medium"
status: "resolved"
mdc: true
---

::content::

<Section title="Approche 1 : useSuspenseQuery + loading.tsx" icon="⏳" variant="concept">

<div class="concept-description">

**<code style="font-size: 0.85em; color: #00B7D8; background-color: #EFF6FF; padding: 2px 4px; border-radius: 4px;">useSuspenseQuery</code>** déclenche automatiquement les **loading.tsx** de **Next.js** :

<div style="height: 15px;"></div>

<div style="display: flex; gap: 1rem; align-items: flex-start;">

<div style="flex: 1;">

```tsx{all}{lines:true, class: '!children:text-[10px] !m-0'}
// app/invoices/page.tsx
function InvoicesPage() {
  const { data } = useSuspenseQuery({
    queryKey: ['invoices'],
    queryFn: fetchInvoices
  })
  
  return <InvoicesList invoices={data} />
}
```

</div>

<div style="flex: 1;">

```tsx{all}{lines:true, class: '!children:text-[10px] !m-0'}
// app/invoices/loading.tsx
export default function Loading() {
  return <Skeleton />
  // ✅ Affiché automatiquement
  // pendant le fetch !
}
```

</div>

</div>

<div style="height: 20px;"></div>

<div style="display: flex; justify-content: space-around; align-items: center; font-size: 0.85em; font-weight: 600;">
  <div><strong><span style="color: #10B981;">✅ :</span></strong> Simple, automatique, intégré au router</div>
  <div><strong><span style="color: #F59E0B;">⚠️ :</span></strong> Fetch côté client (pas idéal pour SEO)</div>
</div>

</div>

</Section>

---
title: Next.js - Solution
layout: solution
ticketNumber: "#TSQ-2024-007"
solutionTitle: "TanStack Query avec Next.js"
concept: "SSR + Suspense + Hydration"
priority: "medium"
status: "resolved"
mdc: true
---

::content::

<Section title="Approche 2 : Prefetch + Hydration (recommandé ⭐)" icon="📡" variant="concept">

<div class="concept-description">
  
**Fetch côté serveur** avec **<code style="font-size: 0.85em; color: #00B7D8; background-color: #EFF6FF; padding: 2px 4px; border-radius: 4px;">fetchQuery</code>** et/ou **<code style="font-size: 0.85em; color: #00B7D8; background-color: #EFF6FF; padding: 2px 4px; border-radius: 4px;">prefetchQuery</code>** :

<div style="height: 15px;"></div>

```tsx{all}{lines:true, class: '!children:text-[10px] !m-0'}
// app/products/page.tsx (Server Component)
export default async function ProductsPage() {
  const queryClient = getQueryClient()
  await queryClient.fetchQuery({ queryKey: ['products'], queryFn: fetchProducts })
  queryClient.prefetchQuery({ queryKey: ['comments'], queryFn: fetchComments })
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsList />
    </HydrationBoundary>
  )}
```

</div>

</Section>

---
title: Next.js - Solution
layout: solution
ticketNumber: "#TSQ-2024-007"
solutionTitle: "TanStack Query avec Next.js"
concept: "SSR + Suspense + Hydration"
priority: "medium"
status: "resolved"
mdc: true
---

::content::

<Section title="fetchQuery vs prefetchQuery" icon="🤔" variant="tip">

**Quelle différence entre les deux ?**

<div style="height: 10px;"></div>

```tsx{all}{lines:true, class: '!children:text-[10px] !m-0'}
// ✅ fetchQuery - ATTEND la réponse
await queryClient.fetchQuery({ queryKey: ['users'], queryFn: fetchUsers })
// Bloque le rendu jusqu'à ce que les données soient disponibles

// ✅ prefetchQuery - Lance en arrière-plan
queryClient.prefetchQuery({ queryKey: ['comments'], queryFn: fetchComments })
// Ne bloque PAS le rendu, les données arriveront plus tard
```

<div style="height: 15px;"></div>

• **fetchQuery** pour les données **critiques** (produit, profil...)

• **prefetchQuery** pour les données **secondaires** (commentaires, suggestions...)

</Section>

---
title: Next.js - Solution
layout: solution
ticketNumber: "#TSQ-2024-007"
solutionTitle: "TanStack Query avec Next.js"
concept: "SSR + Suspense + Hydration"
priority: "medium"
status: "resolved"
mdc: true
---

::content::

<Section title="Approche 2 : Prefetch + Hydration (recommandé ⭐)" icon="📡" variant="concept">

<div class="concept-description">
  
**Hydrater** le cache côté client avec **<code style="font-size: 0.85em; color: #00B7D8; background-color: #EFF6FF; padding: 2px 4px; border-radius: 4px;">HydrationBoundary</code>** :

<div style="height: 15px;"></div>

```tsx{all}{lines:true, class: '!children:text-[10px] !m-0'}
// components/ProductsList.tsx (Client Component)
'use client'

function ProductsList() {
  const { data } = useQuery({ queryKey: ['products'], queryFn: fetchProducts })
  
  // ✅ Données déjà dans le cache, pas de re-fetch !
  return <div>
    {data.map(product => ...)}
  </div>
}
```

</div>

</Section>


---
title: Next.js - Solution
layout: solution
ticketNumber: "#TSQ-2024-007"
solutionTitle: "TanStack Query avec Next.js"
concept: "SSR + Suspense + Hydration"
priority: "medium"
status: "resolved"
mdc: true
---

::content::

<Section title="Disponible dans tous les frameworks SSR !" icon="🌍" variant="highlight">

<div class="concept-description">

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
    <img src="/assets/images/reactRouter.svg" alt="React Router" style="width: 70px; height: 70px; filter: drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3));" />
    <div style="font-size: 0.7em; margin-top: 5px;">Remix</div>
  </div>

  <div class="logo-item" style="text-align: center; animation-delay: 0.1s;">
    <img src="/assets/images/nuxt.svg" alt="Nuxt" style="width: 70px; height: 70px; filter: drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3));" />
    <div style="font-size: 0.7em; margin-top: 5px;">Nuxt</div>
  </div>
  
  <div class="logo-item" style="text-align: center; animation-delay: 0.2s;">
    <img src="/assets/images/svelte.svg" alt="Svelte Kit" style="width: 55px; height: 70px; filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));" />
    <div style="font-size: 0.7em; margin-top: 5px;">Svelte Kit</div>
  </div>
  
  <div class="logo-item" style="text-align: center; animation-delay: 0.3s;">
    <img src="/assets/images/solidStart.svg" alt="Solid Start" style="width: 70px; height: 70px; filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));" />
    <div style="font-size: 0.7em; margin-top: 5px;">Solid Start</div>
  </div>
</div>

<div style="display: flex; flex-direction: column; align-items: center; background-color: #FFFBEB; border-left: 4px solid #F59E0B; padding: 12px; margin: 10px 0; border-radius: 4px; font-size: 0.85em;">
  <p><span style="color: #F59E0B; font-weight: bold;">⚠️ Attention :</span> Avec les frameworks SSR, plus de setup requis !</p>
  <div style="margin-top: 8px; margin-left: 10px; text-align: center;">
    <strong>Synchroniser les queryKeys</strong> entre serveur et client<br />
    <strong>Éviter les singletons</strong> de QueryClient (risque de fuite de données)<br />
    <strong>Configurer le staleTime</strong> correctement pour éviter les re-fetchs<br />
  </div>
</div>

</div>

</Section>