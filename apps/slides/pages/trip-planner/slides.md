---
title: Base Case - Call 
layout: ticket
name: "Marie Dubois"
meta: "Développeuse frontend — application de voyage"
photo: "https://placehold.co/160x160?text=Marie"
ticketNumber: "#TSQ-2024-002"
priority: "medium"
status: "open"
mdc: true
---

::message::

J'ai une application de préparation de voyage, ou l'on peut créer un voyage à partir des différentes villes que l'on veut visiter, et l'application nous permettra de nous aider à préparer ces voyages. Pour l'instant j'ai la liste des villes et des voyages, et j'aimerai bien savoir comment je pourrais inclure TanStack Query dans cette application qui a un état local et une gestion de données assez simple.

::problem::

Comment intégrer TanStack Query dans une application de planification de voyage pour gérer efficacement les données des villes et des voyages ?

---
title: Base Case - Demo
layout: code-server
---

<CodeServer path="trip-planner" />

---
title: Base Case - Solution
layout: solution
ticketNumber: "#TSQ-2024-002"
solutionTitle: "Intégration TanStack Query dans Trip Planner"
concept: "useQuery + useMutation"
priority: "medium"
status: "resolved"
mdc: true
---

::content::

<Section v-click="1" v-show="$clicks === 1" title="Explication" icon="💡">

<br />

Pour ce type d'application avec un état local simple et une gestion de données basique, TanStack Query va transformer votre approche !

<br />

**<span style="color: #EF4444;">👎🏼 Avant :</span>** **<code style="font-size: 0.85em; color: #DC2626; background-color: #FEE2E2; padding: 2px 4px; border-radius: 4px;">useEffect</code>** + **<code style="font-size: 0.85em; color: #DC2626; background-color: #FEE2E2; padding: 2px 4px; border-radius: 4px;">useState</code>** pour chaque appel, gestion manuelle des états de chargement, synchronisation manuelle entre les composants...

<br />

**<span style="color: #10B981;">👍🏼 Après :</span>** **<code style="font-size: 0.85em; color: #10B986; background-color: #DCFCE7; padding: 2px 4px; border-radius: 4px;">useQuery</code>** pour les lectures, **<code style="font-size: 0.85em; color: #10B986; background-color: #DCFCE7; padding: 2px 4px; border-radius: 4px;">useMutation</code>** pour les écritures, et TanStack Query gère tout le reste automatiquement !

<br />

</Section>

<Section v-click="2" v-show="$clicks === 2" title="Concept TanStack Query" icon="⚡" variant="concept">

<div class="concept-description">

**<code style="font-size: 0.85em; color: #10B986; background-color: #DCFCE7; padding: 2px 4px; border-radius: 4px;">useQuery</code>** pour récupérer les données :

```tsx{all}{lines:true}
const { data: trips, isPending } = useQuery({
  queryKey: ['trips'],
  queryFn: listTrips
})
```

<div style="height: 10px;"></div>

**<code style="color: #10B986; font-size: 0.85em; background-color: #DCFCE7; padding: 2px 4px; border-radius: 4px;">useMutation</code>** pour modifier les données (create/delete) :

```tsx{all}{lines:true}
const { mutate: createTrip } = useMutation({
  mutationFn: createTrip,
  onSuccess: () => {}
})
```

</div>

</Section>

---
title: Base Case - Solution
layout: solution
ticketNumber: "#TSQ-2024-002"
solutionTitle: "Intégration TanStack Query dans Trip Planner"
concept: "useQuery + useMutation"
priority: "medium"
status: "resolved"
mdc: true
---

::content::

<Section title="Concept TanStack Query" icon="⚡" variant="concept">

**<code style="font-size: 0.85em; color: #00B7D8; background-color: #EFF6FF; padding: 2px 4px; border-radius: 4px;">refetchQueries</code>** pour rafraîchir la liste :

```tsx{all|6}{lines:true}
const useCreateTripMutation = () => {
  return useMutation({
    mutationFn: createTrip,
    onSuccess: (_data, _variables, _results, context) => {
      // Refetch la liste des trips
      context.client.refetchQueries({ queryKey: ['trips'] });
    }
  });
}
```

</Section>

---
title: Base Case - Solution
layout: solution
ticketNumber: "#TSQ-2024-002"
solutionTitle: "Intégration TanStack Query dans Trip Planner"
concept: "useQuery + useMutation"
priority: "medium"
status: "resolved"
mdc: true
---

::content::

<Section title="Concept TanStack Query" icon="⚡" variant="concept">

**<code style="font-size: 0.85em; color: #00B7D8; background-color: #EFF6FF; padding: 2px 4px; border-radius: 4px;">setQueryData</code>** pour mettre à jour le cache directement :

```tsx{all|5-7}{lines:true}
const useDeleteTripMutation = () => {
  return useMutation({
    mutationFn: deleteTrip,
    onSuccess: (_data, tripId, _results, context) => {
      context.client.setQueryData(['trips'], (old: Trip[]) => // Met à jour le cache
        old.filter((trip) => trip.id !== tripId)
      );
    }
  });
}
```

<div style="text-align: center; margin-top: 5px;">
  <small style="font-size: 0.7em;">💡 <strong>Astuce :</strong> Utilisez <strong>setQueryData</strong> quand vous êtes sûr du résultat (<strong>delete</strong>, <strong>toggle</strong>)</small>
</div>

</Section>

---
title: Base Case - Solution - Récap
layout: solution
ticketNumber: "#TSQ-2024-002"
solutionTitle: "Intégration TanStack Query dans Trip Planner"
concept: "useQuery + useMutation"
priority: "medium"
status: "resolved"
mdc: true
---

::content::

<Section title="Bonnes pratiques" icon="💡" variant="highlight">

<br />

✅ **<span style="color: #00B7D8;">Créer des hooks custom</span>** pour encapsuler la logique et créer une abstraction entre la logique par TanStack Query et l'interface utilisateur.

```tsx{all}{lines:true}
// useListTripQuery.ts
export const useListTripQuery = () => {
  return useQuery({
    queryFn: listTrips,
    queryKey: ['trips']
  });
};
```

<br />

</Section>