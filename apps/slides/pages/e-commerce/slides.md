---
src: /pages/e-commerce/loading.md
transition: fade
---

---
title: Redux - Call
layout: ticket
name: "Sophie Leroy"
meta: "Gérante e-commerce — spécialités Nantaises"
photo: "https://placehold.co/160x160?text=Sophie"
ticketNumber: "#TSQ-2025-004"
priority: "medium"
status: "open"
transition: fade
mdc: true
---

::message::

Je suis l’heureuse gérante de l'application de e-commerce leader sur la vente de spécialités Nantaises, qui fait fureur en ce moment. L'application commence à être un peu vieille, on ne devient pas leader en un jour ! Bien que nous gardons l'application à jour, nous utilisons un gros store Redux qui nous permet de tout gérer, et j'ai entendu dire que TanStack Query pourrait simplifier tout ça, pouvez-vous m'éclairer ?

::problem::

Comment TanStack Query pourrait-il simplifier notre gestion d'état Redux complexe dans notre application e-commerce de spécialités Nantaises ?

---
title: Redux - Demo - Remplacement du store de panier
layout: code-server
transition: fade
---

<CodeServer path="nantes-shop" />

---
title: Redux - Solution
layout: solution
ticketNumber: "#TSQ-2025-004"
solutionTitle: "Migration progressive Redux vers TanStack Query"
concept: "Server State vs Client State"
priority: "medium"
status: "resolved"
transition: fade
mdc: true
---

::content::

<Section title="Le problème du Redux" icon="💡">

**<span style="color: #EF4444;">❌</span>** Avec **<code style="font-size: 0.85em; color: #DC2626; background-color: #FEE2E2; padding: 2px 4px; border-radius: 4px;">Redux</code>**, beaucoup de **boilerplate** pour gérer le panier :

<div style="text-align: center; margin-top: 10px;"></div>

```tsx{all}{lines:true, class: '!children:text-[10px] !m-0'}
// Créer un thunk pour chaque action
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => { return await getCart() });

// Créer le slice avec tous les reducers
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: { setCart, clearError, ... },
  extraReducers: () => {builder.addCase(...).addCase(...).addCase(...)...},
});
```

</Section>

---
title: Redux - Solution
layout: solution
ticketNumber: "#TSQ-2025-004"
solutionTitle: "Migration progressive Redux vers TanStack Query"
concept: "Server State vs Client State"
priority: "medium"
status: "resolved"
transition: fade
mdc: true
---

::content::

<Micka />

<Section title="Concept TanStack Query" icon="⚡" variant="concept">

<div class="concept-description">

**<code style="font-size: 0.85em; color: #00B7D8; background-color: #EFF6FF; padding: 2px 4px; border-radius: 4px;">Server State vs Client State</code>**

<div style="height: 15px;"></div>

**<span style="color: #10B981;">✅ Server State</span>** (TanStack Query) :

• Données du **panier** côté serveur (qui peuvent être partagées entre devices)

• Liste des **produits** et leur disponibilité

• **Commandes** et historique

<div style="height: 10px;"></div>

**<span style="color: #F59E0B;">⚠️ Client State</span>** (Context/Zustand/Redux si vraiment nécessaire) :

• État de l'UI (modals ouvertes, thème...)

• Préférences locales non persistées

• État de formulaire en cours

</div>

</Section>

<!--
- Analysez votre state et déterminez ce qui est server state et ce qui est client state. Pensez à migrer progressivement !
- Combiner plusieurs solutions si nécessaire
- Ne pas sur-ingénierer 🧠
-->

---
title: Redux - Solution
layout: solution
ticketNumber: "#TSQ-2025-004"
solutionTitle: "Migration progressive Redux vers TanStack Query"
concept: "Server State vs Client State"
priority: "medium"
status: "resolved"
transition: fade
mdc: true
---

::content::

<Section title="Faut-il migrer depuis Redux ?" icon="🤔" variant="highlight">

<div style="font-size: 0.85em;">

**<span style="color: #10B981;">✅ OUI, si :</span>**

• Vous utilisez Redux **principalement pour les appels API**

• Vous avez beaucoup de **boilerplate** pour gérer le cache

• Votre app fait beaucoup d'**appels serveur**

• Vous voulez une **meilleure DX** (Developer Experience)

<br />

**<span style="color: #EF4444;">❌ NON, si :</span>**

• Redux est **déjà en place et fonctionne bien** et que vous ne ressentez pas de problème pour scaler

• Votre app est **majoritairement client-side** ⏭︎

<div style="background-color: #FFFBEB; border-left: 4px solid #F59E0B; padding: 8px; margin: 10px 0; border-radius: 4px;">
  <span style="color: #F59E0B; font-weight: bold;">⚠️ Alternative :</span> Si vous voulez rester dans l'écosystème Redux → <code style="font-size: 0.85em; color: #00B7D8; background-color: #EFF6FF; padding: 2px 4px; border-radius: 4px; font-weight: bold;">RTK Query</code>
</div>

</div>

</Section>
