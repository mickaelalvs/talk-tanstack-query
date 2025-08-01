# TanStack Use Cases

<!--
## Template

### Story

### TanStack features highlighted

### Main use cases points

### Notes
-->

---

## Base React Query Case

### Story

"J'aimerai faire une application frontend qui me permettrait de consommer une api qui contient toute la logique metier, on m'a parlé de TanStack Query en me disais que ça me permettrai de gérer mes appels API pour moi, est ce que c'est une bonne solution ?"

### TanStack features highlighted

- [caching with queryKey](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys)
- [useQuery](https://tanstack.com/query/latest/docs/framework/react/guides/queries)
- [useMutation](https://tanstack.com/query/latest/docs/framework/react/guides/mutations)
- [Devtools](https://tanstack.com/query/latest/docs/framework/react/devtools#install-and-import-the-devtools)

### Main use cases points

Ce cas est présent pour permettre de parler des concepts de base de TanStack Query, et de le présenter comme une librarie de gestion d'état serveur plus que comme un fetcher

### Notes

On peut aussi en profiter pour parler du DevTools, qui nous permettra par la suite de montrer plus précisément les fonctionnalités dans les exemple d'après

---

## List view

### Story

"J'ai vu quelques personnes utiliser cet outil pour faire des appels et garder les informations en cache, mais j'ai l'impression que je tombe sur un cas un peu limite
J'ai dans mon application une vue ou mon utilisateur peut voir la liste de ses [insérer ici une ressource genre facture, talk, séries tv, film ...], et mon utilisateur peux faire plein d'action dessus, comme des filtres, des recherches, des suppressions, j'ai l'impression de passer mon temps a invalider des requêtes

### TanStack features highlighted

- [Query Invalidation](https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation)
- [Query key avancée (invalidation par les filtres)](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys#if-your-query-function-depends-on-a-variable-include-it-in-your-query-key)

### Main use cases points

Permet de montrer un cas un peu présent dans toutes les appli du monde (liste + filtre et recherche) et de montrer que ça facilites les choses et permet de gérer ça en grande partie avec les query key
### Notes

---

## Big Redux codebase

### Story

"J'ai une application qui utilise Redux à fond, tout les states qui ne sont pas des useState sont dans des stores redux, il parait que TanStack query "révolutionne" la gestion d'état selon vous, comment est ce que ça peut simplifier mon quotidien ?"

### TanStack features highlighted

- useQuery no multiple query
- queryOptions / custom hook

### Main use cases points

Dans le cas ou le state de l'application est grandement coté serveur, TanStack Query est une très bonne solution pour gérer le state sans tout le boilerplate qu'une librarie comme Redux ou Zustand demande pour fonctionner

Cependant, ces librairie ne sont pas mauvaise pour autant et une refonte avec TanStack Query n'est pas toujours la solution

- Sur une application avec un gros Redux en legacy, RTK Query est une très bonne solution
- Utiliser TanStack Query ne veut pas dire ne pas utiliser de librarie de store, on peut soit passer sur des librairie moins grosse comme Jotai ou tout simplement les context, voir garder certaine partie de l'app sous store

### Notes

On peut prendre l'exemple d'un store avec action / reducer / state et le convertir en TanStack Query, pour ensuite parler des autres solution plus lié a Redux ([RTK Query](https://redux-toolkit.js.org/rtk-query/overview) ou [PiniaColada](https://pinia-colada.esm.dev/quick-start.html))

---

## Big Latency backend

### Story

"Je développe une application qui a pour but d'être utilisé dans des zone à faible débit internet, voir sans débit. Est ce que cette solution prend en compte ces cas la ? Comment pourrai elle m'aider pour ça ?"

### TanStack features highlighted

- [Optimistic Updates](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates)
- [Offline first mode](https://tanstack.com/query/latest/docs/framework/react/guides/network-mode#network-mode-offlinefirst)
- [Offline example](https://tanstack.com/query/latest/docs/framework/react/examples/offline?path=examples/react/offline/src/App.tsx)

### Main use cases points

Permet de mettre en avant les optimistic update, qui permettre une meilleure experience utilisateur en modifiant directement le cache

### Notes

---

## Full frontend state application

### Story

"Je gère actuellement tout l'état de mon application coté frontend avec une librairie de store, j'ai commencé à utiliser TanStack Query pour stocker tout ça en faisant des modifications direct dans le cache, est ce que je vais dans le bon sens ?"

### TanStack features highlighted

- Aucune

### Main use cases points

Ce use case permet de montrer les limites de TanStack Query, qui n'est pas la pour remplacer le fonctionnement pur d'un store

### Notes

Peut être trop brut / tiré par les cheveux pour passer pour un cas réel ?

---

## "Use with Next"

### Story

"J'ai une application qui NextJS que je suis en train de migrer vers le App router, j'utilise déjà TanStack Query mais j'aimerai pouvoir profiter au maximum des nouveautés du router comme les loading / gestion d'erreur automatique et les React Server component, comment faire ?"

### TanStack features highlighted

- [useSuspenseQuery](https://tanstack.com/query/latest/docs/framework/react/guides/suspense) => Utilisation ce ce hook pour déclencher automatiquement les "loading.tsx" de NextJS
- [Prefetching]https://tanstack.com/query/latest/docs/framework/react/guides/prefetching + [hydration coté serveur](https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr) => Permet de fetch coté serveur puis de récupérer les info coté front
  - queryClient.fetchQuery / queryClient.prefecthQuery
  - HydrationBoundaries

### Main use cases points

L'utilisation de NextJS / Nuxt / SSR ne bloque pas l'utilisation de TanStack Query au contraire, il y a plusieurs manière de faire les choses avec des utilitaires fait pour ça pour permettre de gérer ça

### Notes

---

## Tips & Tricks

### Story

"J'ai une demande un peu particulière, j'ai une application qui utilise TanStack Query a fond, est ce que vous avez des conseils ou des petits tips d'expert qui me permettrai d'améliorer mon utilisation ?"

### TanStack features highlighted

- [Query Options meta sur le query client qui permet d'invalider des query automatiquement après des mutations](https://www.youtube.com/watch?v=QP1_vuzOYJs)
- [Infinite Query](https://tanstack.com/query/latest/docs/framework/react/reference/useInfiniteQuery)
...

### Main use cases points

### Notes

Fausse demande qui permet de pouvoir ouvrir une petite partie "tips" décousus et pas forcément en lien, possible de faire une blague en mode "tiens on dirais presque qu'il nous a appelé pour que ça aille pile avec notre dernière partie"
