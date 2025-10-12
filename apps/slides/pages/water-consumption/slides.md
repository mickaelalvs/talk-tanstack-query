---
title: List - Call
layout: ticket
name: "Pierre Martin"
meta: "Gérant syndic d'immeuble — gestion consommation"
photo: "https://placehold.co/160x160?text=Pierre"
ticketNumber: "#TSQ-2024-003"
priority: "high"
status: "open"
transition: fade
mdc: true
---

::message::

Je suis le gérant d'un syndic d'immeuble, et j'ai donc à disposition une application que me permet de suivre la consommation des différents occupants, mais le code devient un peu fouillit avec tout les appels réseaux que je doit gérer, et je ne parle même pas des états de chargement qui arrivent de partout. J'ai cru comprendre que TanStack Query pourrais m'aider, pouvez vous me guider ?

::problem::

Comment simplifier la gestion des appels réseau et des états de chargement dans une application de suivi de consommation d'eau avec TanStack Query ?

---
title: List - Demo - Data graph
layout: code-server
transition: fade
---

<CodeServer path="water-meter" />

---
title: List - Solution
layout: solution
ticketNumber: "#TSQ-2024-003"
solutionTitle: "Simplification de la gestion des données de consommation"
concept: "Query Keys Dynamiques"
priority: "high"
status: "resolved"
transition: fade
mdc: true
---

::content::

<Section title="Le problème" icon="💡">

**<span style="color: #EF4444;">❌</span>** Application avec filtres, recherche, tri... on passe son temps à invalider les queries manuellement !

<div style="text-align: center; margin-top: 15px;"></div>

```tsx{all}{lines:true}
const setTypeFilter = useCallback((value: string) => {
  setTypeFilterRaw(value);
  queryClient.removeQueries({ queryKey: ['water-meters'] }); // ❌ À répéter partout
}, [setTypeFilterRaw, queryClient]);

const setFloorFilter = useCallback((value: string) => {
  setFloorFilterRaw(value);
  queryClient.removeQueries({ queryKey: ['water-meters'] }); // ❌ Encore !
}, [setFloorFilterRaw, queryClient]);
```

</Section>

---
title: List - Solution
layout: solution
ticketNumber: "#TSQ-2024-003"
solutionTitle: "Simplification de la gestion des données de consommation"
concept: "Query Keys Dynamiques"
priority: "high"
status: "resolved"
transition: fade
mdc: true
---

::content::

<Section title="Concept TanStack Query" icon="⚡" variant="concept">

<div class="concept-description">

**<code style="font-size: 0.85em; color: #00B7D8; background-color: #EFF6FF; padding: 2px 4px; border-radius: 4px;">Query Keys Dynamiques</code>** : incluez vos filtres dans la queryKey !

```tsx{all}{lines:true}
export const useWaterMetersQuery = () => {
  const { searchTerm, typeFilter, floorFilter, ...others } = useMetersFilters();

  const filters = { search: searchTerm, etage: floorFilter, ...others };

  return useQuery({
    queryFn: () => listWaterMeter(filters),
    queryKey: ['water-meters', filters], // ✅ Query key dynamique !
    select: (data) => data.meters,
  });
};
```

</div>

</Section>

---
title: List - Solution
layout: solution
ticketNumber: "#TSQ-2024-003"
solutionTitle: "Simplification de la gestion des données de consommation"
concept: "Query Keys Dynamiques"
priority: "high"
status: "resolved"
transition: fade
mdc: true
---

::content::

<Section title="Comment ça marche ?" icon="🔄" variant="concept" class="text-[12px]">

<div style="display: flex; gap: 98px; align-items: center;">

<div>

**<span style="color: #EF4444; font-size: 1.1em !important;">👎🏼 Avant :</span>** **<code style="font-size: 0.85em !important; color: #DC2626; background-color: #FEE2E2; padding: 2px 4px; border-radius: 4px;">removeQueries</code>**

</div>

<div>

• L'utilisateur change un filtre, on met à jour l'état local

• **On doit manuellement** invalider la query avec **<code style="font-size: 0.85em !important; color: #10B986; background-color: #DCFCE7; padding: 2px 4px; border-radius: 4px;">removeQueries</code>**

• La query se refetch avec les nouveaux filtres

</div>

</div>

<br /><br />

<v-click>

<div style="display: flex; gap: 50px; align-items: center;">

<div>

**<span style="color: #10B981; font-size: 1.1em !important;">👍🏼 Après :</span>** **<code style="font-size: 0.85em !important; color: #10B986; background-color: #DCFCE7; padding: 2px 4px; border-radius: 4px;">Query Keys Dynamiques</code>**

</div>

<div>

• L'utilisateur change un filtre

• Le hook **<code style="font-size: 0.85em !important; color: #10B986; background-color: #DCFCE7; padding: 2px 4px; border-radius: 4px;">useMetersFilters()</code>** retourne la nouvelle valeur

• La queryKey de **<code style="font-size: 0.85em !important; color: #10B986; background-color: #DCFCE7; padding: 2px 4px; border-radius: 4px;">useWaterMetersQuery</code>** change automatiquement

• **TanStack Query détecte le changement et refetch automatiquement !**

</div>

</div>

<br /><br />

**<span style="color: #F59E0B; font-size: 1.1em !important;">💡 Bonnes pratiques :</span>** **Inclure TOUS les paramètres** qui affectent les données dans la **<code style="font-size: 0.85em; color: #00B7D8; background-color: #EFF6FF; padding: 2px 4px; border-radius: 4px;">queryKey</code>**

```tsx
queryKey: ['water-meters', { search, type, floor, sort }] // ✅

```

</v-click>

</Section>

---
title: List - Solution
layout: solution
ticketNumber: "#TSQ-2024-003"
solutionTitle: "Simplification de la gestion des données de consommation"
concept: "Query Keys Dynamiques"
priority: "high"
status: "resolved"
transition: fade
mdc: true
---

::content::

<Section title="Bonus : React Query Devtools" icon="🛠️" variant="highlight">

<br />

**<span style="color: #00B7D8;">React Query Devtools</span>** permet de visualiser toutes vos queries en temps réel :

<br />

✅ **Voir les query keys** avec leurs paramètres

✅ **État des queries** (loading, success, error, stale...)

✅ **Nombre de queries** actives et en cache

✅ **Invalider manuellement** une query pour tester

✅ **Inspecter les données** retournées par chaque query

<div style="text-align: center; margin-top: 10px;">
  <small style="font-size: 0.7em;">ℹ️ <strong>Info :</strong> Les devtools ne sont pas inclus en production par défaut !</small>
</div>

</Section>
