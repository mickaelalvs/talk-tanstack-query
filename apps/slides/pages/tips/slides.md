---
title: Tips & Tricks - Call
layout: ticket
name: "Lucas Petit"
meta: "Développeur senior — expert TanStack Query"
photo: "https://placehold.co/160x160?text=Lucas"
ticketNumber: "#TSQ-2024-008"
priority: "low"
status: "open"
transition: view-transition
mdc: true
---

::message::

Je suis un gros utilisateur de TanStack Query, je l'utilise partout que je peux. J'ai ouï dire que vous etiez des professionnels, avez vous des petits conseil pour améliorer encore l'utilisation de ce super outil ?

::problem::

Quels sont les meilleures pratiques et astuces avancées pour optimiser l'utilisation de TanStack Query dans des applications complexes ? 

---
title: Tips & Tricks - useInfiniteQuery
layout: solution
ticketNumber: "#TSQ-2025-007"
solutionTitle: "Query infini !"
concept: "Infinite Query"
priority: "low"
status: "resolved"
mdc: true
---


::content::

<Section title="Implémenter un scroll infini" icon="♾️">

<div class="concept-description">
  
Rien de plus simple avec **<code style="font-size: 0.85em; color: #00B7D8; background-color: #EFF6FF; padding: 2px 4px; border-radius: 4px;">useInfiniteQuery</code>** :

<div style="height: 15px;"></div>

<div style="display: flex; gap: 1rem; align-items: flex-start;">

<div style="flex: 1;">

```tsx{all}{lines:true, class: '!children:text-[10px] !m-0'}
const {
    data, 
    isPending,
    fetchNextPage,
} = useInfiniteQuery({
    queryFn: listProject,
    queryKey: ['projects'],
    initialPageParams: 0,
    getNextPageParam: (lastPage) => 
        lastPage.nextPage,
})
```
</div>

<div style="flex: 1;">

```tsx{all}{lines:true, class: '!children:text-[10px] !m-0'}
async function listProject({pageParam}) => {
    const apiUrl = `/api/projects?page=${pageParam}`
    const response = fetch(apiUrl)
    return await response.json()
}
```
</div>


</div>


</div>

</Section>

---
title: Tips & Tricks - useInfiniteQuery
layout: solution
ticketNumber: "#TSQ-2025-007"
solutionTitle: "Query infini !"
concept: "Infinite Query"
priority: "low"
status: "resolved"
mdc: true
---


::content::

<Section title="Plein de possibilités" icon="♾️">

<div class="concept-description">
  
L'API de **<code style="font-size: 0.85em; color: #00B7D8; background-color: #EFF6FF; padding: 2px 4px; border-radius: 4px;">useInfiniteQuery</code>** est très similaire à celle du **<code style="font-size: 0.85em; color: #00B7D8; background-color: #EFF6FF; padding: 2px 4px; border-radius: 4px;">useQuery</code>** avec en plus :

<div style="height: 15px;"></div>

•   **fetchNextPage** pour déclencher la prochaine requête

<div style="height: 10px;"></div>

•   **data.pages** et **data.pageParams** qui stocke les informations de la query

<div style="height: 10px;"></div>

•   **hasNextPage** pour savoir si il reste des données

<div style="height: 10px;"></div>

•   **isFetchingNextPage** pour les indications de chargements

<div style="height: 10px;"></div>

•   **initialPageParam** pour donner la page de départ

</div>

<div style="background-color: #EFF6FF; border-left: 4px solid #00B7D8; padding: 8px; margin: 10px 0; border-radius: 4px; font-size: 0.85em;">
  <span style="color: #00B7D8; font-weight: bold;">💡 Information :</span> Tout est dispo dans les deux sens, en remplaçant <i>Next</i> par <i>Previous</i> !
</div>

</Section>

---
title: Tips & Tricks - meta
layout: solution
ticketNumber: "#TSQ-2025-007"
solutionTitle: "Invalidation automatique"
concept: "useMutation meta"
priority: "low"
status: "resolved"
mdc: true
---


::content::

<Section title="Trop de boilerplate ?" icon="🗑️" variant="default">

<div class="concept-description">

Dans une grosse codebase, on peut vite se retrouver avec **beaucoup de répétitions** dans les functions callback de **nos mutations** ...

Notamment pour invalider une query pour récupérer la **donnée updatée**

<div style="height: 10px" />

```tsx{all}{lines:true, class: '!children:text-[10px] !m-0'}
const { mutate } = useMutation({
    [...]
    onSettled: (_data, _variables, _result, context) => {
        context.client.invalidateQueries(['list-post'])
    }
})
```

</div>

</Section>

---
title: Tips & Tricks - meta
layout: solution
ticketNumber: "#TSQ-2025-007"
solutionTitle: "Invalidation automatique"
concept: "useMutation meta"
priority: "low"
status: "resolved"
mdc: true
---


::content::

<Section title="Une solution, les métadonnées !" icon="🤘" variant="highlight">

<div class="concept-description">

Déclarez des métadonnées dans le **MutationCache** de votre **QueryClient** !

<div style="height: 15px" />

```tsx{all}{lines:true, class: '!children:text-[10px] !m-0'}
const queryClient = new QueryClient({
    mutationCache: new MutationCache({
        onSuccess: (_data, _variables, _result, context) =>
            if (context.meta?.queryKeys) {
                context.client.invalidateQueries({
                    queryKey: mutation.meta?.queryKeys,
                })
            }
    })
})
```

</div>

</Section>

---
title: Tips & Tricks - meta
layout: solution
ticketNumber: "#TSQ-2025-007"
solutionTitle: "Invalidation automatique"
concept: "useMutation meta"
priority: "low"
status: "resolved"
mdc: true
---


::content::

<Section title="Une solution, les métadonnées !" icon="🤘" variant="highlight">

<div class="concept-description">

Il ne vous reste plus qu'a les appeler dans votre **useMutation** ! 🥳

<div style="height: 15px" />

```tsx{all}{lines:true, class: '!children:text-[10px] !m-0'}
const { mutate } = useMutation({
    mutationFn: createPost,
    mutationKey: ['create-post'],
    meta: {
        queryKeys: ['list-post']
    }
})
```

<div style="height: 15px" />

Et le tour est joué ! 🎉

</div>

</Section>

---
title: Tips & Tricks - query key factory
layout: solution
ticketNumber: "#TSQ-2025-007"
solutionTitle: "Query Key Factory"
concept: "Query Key Factory"
priority: "low"
status: "resolved"
mdc: true
---


::content::

<Section title="Trop de clés ..." icon="🔑" variant="default">

<div class="concept-description">

Dans un cas réel, le nombre de query peut grandir très vite, avec le nombre de clés par extension

<div style="height: 10px" />

⚠️ Cela peut mener à **plusieurs problèmes** :

<div style="height: 20px" />

<div style="margin-left: 30px">
❌  Possibilité d'erreur grandissante
<div style="height: 15px" />

❌  Moins facile de profiter de la **hierarchie des clés**
<div style="height: 15px" />

❌  Fichier de clés qui peuvent devenir **illisible**
<div style="height: 15px" />
</div>
</div>

</Section>

---
title: Tips & Tricks - query key factory
layout: solution
ticketNumber: "#TSQ-2025-007"
solutionTitle: "Query Key Factory"
concept: "Query Key Factory"
priority: "low"
status: "resolved"
mdc: true
---


::content::

<Section title="Solution 1 : Séparation + Colocation" icon="🫂" variant="default">

<div class="concept-description">

<div style="background-color: #EFF6FF; border-left: 4px solid #00B7D8; padding: 8px; margin-top: -5px; border-radius: 4px; font-size: 0.85em;">
  <span style="color: #00B7D8; font-weight: bold;">💡 Solution :</span> Préférez la <strong>colocation</strong> de plusieurs fichiers de clés, <strong>proche du code qui les concernent</strong> !
</div>

<div class="flex gap-4 mt-2">

<div class="flex-1">
```tsx{all}{class: '!children:text-[10px] !m-0'}
// query-keys.ts
const QUERY_KEYS = {
    invoices: () => ['invoices']
    invoice: ({invoiceId}) =>  ['invoices', invoiceId],
    transactions: () => ['transactions'],
    transaction: (transId) => ['transactions', transId],
    client: () => ['clients'],
    client: (clientId) => ['clients', clientId],
    // 234 keys more ...
}
```
</div>
<div class="flex-1 flex flex-col gap-1">
```tsx{all}{class: '!children:text-[10px] !m-0'}
// invoices.keys.ts
const INVOICES_QUERY_KEYS = {
    invoices: () => ['invoices']
    [...]
}
```

```tsx{all}{class: '!children:text-[10px] !m-0'}
// transactions.keys.ts
const TRANSACTIONS_QUERY_KEYS = {
    transactions: () => ['transactions'],
    [...]
}
```

</div>

</div>
</div>

</Section>

---
title: Tips & Tricks - query key factory
layout: solution
ticketNumber: "#TSQ-2025-007"
solutionTitle: "Query Key Factory"
concept: "Query Key Factory"
priority: "low"
status: "resolved"
mdc: true
---


::content::

<Section title="Solution 2 : Key Factory" icon="🔑" variant="default">

<div class="concept-description">

<div style="background-color: #EFF6FF; border-left: 4px solid #00B7D8; padding: 8px; margin: 10px 0; border-radius: 4px; font-size: 0.85em;">
  <span style="color: #00B7D8; font-weight: bold;">💡 Solution :</span> La création de <strong>Key Factory</strong> pour chaque feature</div>

<div style="height: 10px" />

```tsx{all}{lines:true, class: '!children:text-[10px] !m-0'}
const todoKeys = {
  all: ['todos'] as const,
  lists: () => [...todoKeys.all, 'list'] as const,
  list: (filters: string) => [...todoKeys.lists(), { filters }] as const,
  details: () => [...todoKeys.all, 'detail'] as const,
  detail: (id: number) => [...todoKeys.details(), id] as const,
}
```

<div style="height: 20px" />

**<code style="font-size: 0.85em; color: #10B981; background-color: #D1FAE5; padding: 2px 4px; border-radius: 4px;">👍 Chaque clé peut dépendre directement d'une clé parente !</code>**

</div>

</Section>

---
title: Tips & Tricks - query key factory
layout: solution
ticketNumber: "#TSQ-2025-007"
solutionTitle: "Query Key Factory"
concept: "Query Key Factory"
priority: "low"
status: "resolved"
mdc: true
---


::content::

<Section title="Solution 2 : Key Factory" icon="🔑" variant="default">

<div class="concept-description">

Et tout devient très simple à utiliser !  🎉

<div style="height: 10px" />

```tsx{all}{lines:true, class: '!children:text-[10px] !m-0'}
// Invalide toutes les query de la feature de todo
queryClient.invalidateQueries({ queryKey: todoKeys.all() })

// Supprimer toutes les query des listes
queryClient.removeQueries({ queryKey: todoKeys.lists() })

// Fetch les informations d'un todo
queryClient.fetchQueries({ queryKey: totoKeys.details(id), queryFn: () => fetchTodo(id) })
```

<div style="text-align: center; margin-top: 15px;">
  <small style="font-size: 0.7em;">💡 <strong>Et c'est complétement utilisable avec la colocation !</strong></small>
</div>


</div>

</Section>