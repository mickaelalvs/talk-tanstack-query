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
title: Next.js - useSuspenseQuery
layout: solution
ticketNumber: "#TSQ-2025-006"
solutionTitle: "Utilisation avec Next.js"
concept: "Utilisation du Suspense"
priority: "medium"
status: "resolved"
mdc: true
---

::content::

<Section title="Utilisation de la SuspenseQuery" icon="⏳" variant="default">

<div class="concept-description">

**<code style="font-size: 0.85em; color: #00B7D8; background-color: #EFF6FF; padding: 2px 4px; border-radius: 4px;">UseSuspenseQuery</code>** : Profitez un maximum du router de **Next.js** !

<div style="height: 10px;"></div>

```tsx{all|2}{lines:true}
export function useInvoicesSuspenseQuery(filters: InvoiceFilters) {
  return useSuspenseQuery({
    queryKey: ['invoices-list', { filters }],
    queryFn: listInvoices,
  });
}
```

<div style="text-align: center; margin-top: 5px;">
  <small style="font-size: 0.7em;">💡 <strong>Astuce :</strong> Le app router de Next.js est construit autour de l'API suspense !</small>
</div>

<br />

</div>

</Section>

---
title: Next.js - Prefetching
layout: solution
ticketNumber: "#TSQ-2025-006"
solutionTitle: "Utilisation avec Next.js"
concept: "Prefetcher coté serveur"
priority: "medium"
status: "resolved"
mdc: true
---

::content::

<Section title="Prefetcher coté serveur" icon="📡" variant="default">

<div class="concept-description">
  
**<code style="font-size: 0.85em; color: #00B7D8; background-color: #EFF6FF; padding: 2px 4px; border-radius: 4px;">dehydrate</code>** et **<code style="font-size: 0.85em; color: #00B7D8; background-color: #EFF6FF; padding: 2px 4px; border-radius: 4px;">HydrationBoundary</code>** pour fetcher vos données coté serveur et hydrater le cache TanStack coté client ! ⛲

<div style="height: 10px;"></div>

```tsx{all|2-4|7-9}{lines:true, class: '!children:text-[10px] !m-0'}
export default async function ServerComponent() {
  const queryClient = getQueryClient();
  await queryClient.fetchQuery({ queryKey: 'list-thumbnail', queryFn: ListThumbnails })
  queryClient.prefetchQuery({ queryKey: 'list-review', queryFn: ListReviews });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ThumbnailList />
    </HydrationBoundary>
)}
```

</div>

</Section>

---
title: Next.js - Other Framework
layout: solution
ticketNumber: "#TSQ-2025-006"
solutionTitle: "Utilisation avec Next.js"
concept: "Prefetcher coté serveur"
priority: "medium"
status: "resolved"
mdc: true
---

::content::

<Section title="Disponible partout !" icon="🌍" variant="highlight">

<div class="concept-description">

<div style="height: 10px;"></div>

Tous ces concepts sont utilisables dans d'autres **<span style="color: #10B981;">frameworks</span>** ! 

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
    <img src="/assets/images/reactRouter.svg" alt="React Router" style="width: 100px; height: 100px; filter: drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3));" />
    <div style="font-size: 0.7em; margin-top: 5px;">Remix</div>
  </div>
  

  <div class="logo-item" style="text-align: center; animation-delay: 0.1s;">
    <img src="/assets/images/nuxt.svg" alt="Nuxt" style="width: 100px; height: 100px; filter: drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3));" />
    <div style="font-size: 0.7em; margin-top: 5px;">Nuxt</div>
  </div>
  
  <div class="logo-item" style="text-align: center; animation-delay: 0.2s;">
    <img src="/assets/images/svelte.svg" alt="Svelte Kit" style="width: 75px; height: 100px; filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));" />
    <div style="font-size: 0.7em; margin-top: 5px;">Svelte Kit</div>
  </div>
  
  <div class="logo-item" style="text-align: center; animation-delay: 0.3s;">
    <img src="/assets/images/solidStart.svg" alt="Solid Start" style="width: 100px; height: 100px; filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));" />
    <div style="font-size: 0.7em; margin-top: 5px;">Solid Start</div>
  </div>
</div>


</div>

</Section>