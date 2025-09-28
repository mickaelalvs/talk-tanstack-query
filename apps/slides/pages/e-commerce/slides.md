---
title: Redux - Call 
layout: ticket
name: "Sophie Leroy"
meta: "Gérante e-commerce — spécialités Nantaises"
photo: "https://placehold.co/160x160?text=Sophie"
ticketNumber: "#TSQ-2024-004"
priority: "medium"
status: "open"
transition: view-transition
mdc: true
---

::message::

Je suis l'heureux gérant de l'application de e-commerce leader sur la vente de spécialité Nantaises, qui fait fureur en ce moment. L'application commence à être un peut vieille, on ne devient pas leader en un jour ! Bien que nous gardons l'application à jour, nous utilisons un gros store Redux qui nous permet de tout gérer, et j'ai entendu dire que TanStack Query pourrai simplifier tout ça, pouvez vous m'éclairer ?

::problem::

Comment TanStack Query pourrait-il simplifier notre gestion d'état Redux complexe dans notre application e-commerce de spécialités Nantaises ?

---
title: Redux - Demo - Remplacement du store de panier
layout: code-server
transition: view-transition
---

<CodeServer path="nantes-shop" />

---
title: Redux - Solution
layout: solution
ticketNumber: "#TSQ-2024-004"
solutionTitle: "Migration progressive Redux vers TanStack Query"
concept: "Server State vs Client State"
priority: "medium"
status: "resolved"
transition: view-transition
mdc: true
---

::content::

<Section v-click="1" v-show="$clicks === 1" title="Explication" icon="💡">

TanStack Query ne remplace pas complètement Redux, mais il s'occupe spécifiquement du **server state** (données venant de l'API).

Pour votre e-commerce, vous pouvez garder Redux pour le panier (client state) et utiliser TanStack Query pour les produits, commandes, etc.

**Stratégie hybride :** Le meilleur des deux mondes !

</Section>

<Section v-click="2" v-show="$clicks === 2" title="Concept TanStack Query" icon="⚡" variant="concept">

<div class="concept-highlight">
    <span class="concept-label">Concept clé :</span>
    <span class="concept-name">Server State vs Client State</span>
</div>
<div class="concept-description">

**Server State** (TanStack Query) :
- Données des produits
- Commandes et historique
- Profils utilisateurs
- Données qui changent souvent

**Client State** (Redux/Zustand) :
- Panier d'achat
- Préférences UI
- État local des composants

</div>

</Section>

<Section v-click="3" v-show="$clicks === 3" title="Avantages" icon="🎯" variant="highlight">

- **Séparation claire** : Server state vs Client state
- **Performance** : Cache intelligent pour les données serveur
- **Simplicité** : Moins de boilerplate pour les appels API
- **Migration progressive** : Pas besoin de tout refaire d'un coup

</Section>

---
title: Redux - Faut-il migrer ?
---

Pas forcément + RTK

---
title: Redux - Store atomique
transition: view-transition
---

L'utilisation de TanStack Query ne veux pas dire plus du tout de stores, certain état doivent être stocké
=> On peut utiliser une librairie de store atomique / un context react voir l'url (nuqs FTW)

---
title: Redux - Conclusion
transition: view-transition
---

- TanStack Query remplace très bien un Redux / Pinia
- Si l'application est très historique, pas forcément besoin de migrer
  - Si ça marche, ça marche
  - Si vraiment on veux faire quelque chose, des alternatives plus lié a Redux existe comme RTK ou PiniaColada
- Des librairies de store peuvent toujours être utilisé pour certain état => Context / Store Atomique