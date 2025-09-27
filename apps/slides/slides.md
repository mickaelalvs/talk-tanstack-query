---
title: "Révolution TanStack Query : Enfin une bonne gestion d’état 🗂️"
description: "Gérer l’état dans une application frontend est un défi quotidien… 🤯 Entre Redux, Zustand, Recoil, les React Context ou encore Pinia côté Vue, les options sont nombreuses, mais parfois trop ! Et quand on y ajoute la gestion des appels réseau, du cache, des états de chargement ou d’erreur, le tout peut vite devenir un vrai casse-tête… 💣"
image: "assets/images/icon.png"
favicon: "/assets/images/icon.png"
titleTemplate: "%s"
monaco: true
mdc: true
overviewSnapshots: true
fonts:
  sans: League Spartan
  weights: "100,200,300,400,500,600,700,800,900"
  mono: Fira Code
colorSchema: light
src: /pages/introduction/slides.md
seoMeta:
  ogTitle: "Révolution TanStack Query : Enfin une bonne gestion d’état 🗂️"
  ogDescription: "Gérer l’état dans une application frontend est un défi quotidien… 🤯 Entre Redux, Zustand, Recoil, les React Context ou encore Pinia côté Vue, les options sont nombreuses, mais parfois trop ! Et quand on y ajoute la gestion des appels réseau, du cache, des états de chargement ou d’erreur, le tout peut vite devenir un vrai casse-tête… 💣"
  ogImage: "/assets/images/og.jpeg"
  ogUrl: "https://cruuzazul.dev"
  twitterCard: summary_large_image
  twitterTitle: "Révolution TanStack Query : Enfin une bonne gestion d’état 🗂️"
  twitterDescription: "Gérer l’état dans une application frontend est un défi quotidien… 🤯 Entre Redux, Zustand, Recoil, les React Context ou encore Pinia côté Vue, les options sont nombreuses, mais parfois trop ! Et quand on y ajoute la gestion des appels réseau, du cache, des états de chargement ou d’erreur, le tout peut vite devenir un vrai casse-tête… 💣"
  twitterImage: "/assets/images/og.jpeg"
  twitterUrl: "https://cruuzazul.dev"
---

# TanStack Query

Service après ventes des app web

---

# Qu'est ce que c'est TanStack Query


---
title: Basic slide
layout: basic
transition: view-transition
---

<p>Lorem ipsum</p>

---
title: Basic title slide
layout: basic-title
transition: view-transition
mdc: true
---
 
::title::

Titre de la slide

::default::

<div
    class="relative p-10 w-full h-full flex gap-32 text-center leading-tight text-5xl items-center justify-items-center pt-10">
    <p>Lorem ipsum</p>
</div>

---
title: Liste
layout: list
transition: view-transition
mdc: true
---

::title::

Lorem Ipsum

::default::

<v-clicks>

- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
- <strong>Sed do eiusmod tempor:</strong>
  - Incididunt ut labore et dolore magna aliqua.
  - Ut enim ad minim veniam, quis nostrud exercitation.

</v-clicks>

---
title: Single fact
layout: single-fact
transition: view-transition
mdc: true
---

::fact::

1234 {.view-transition-fact}

::title::

<span class="js font-medium">
    Lorem <span v-mark="{ color: '#C73321', type: 'strike-through', width: 5 }">Ipsum</span>
</span>

::description::

Dolor sit amet, consectetur adipiscing elit...

---
title: Title
layout: title
transition: view-transition
mdc: true
---

Lorem Ipsum

---
title: Base Case - Call 
layout: client-calling
transition: view-transition
mdc: true
---

# [Trip Planner]{style="font-size: 50px;font-weight: bold"}

J'ai une application de préparation de voyage, ou l'on peut créer un voyage à partir des différentes villes que l'on veut visiter, et l'application nous permettra de nous aider à préparer ces voyages
Pour l'instant j'ai la liste des villes et des voyages, et j'aimerai bien savoir comment je pourrais inclure TanStack Query dans cette application

---
title: Base Case - Demo
layout: code-server
transition: view-transition
---

<CodeServer path="trip-planner" />

---
title: List - Call
layout: client-calling
transition: view-transition
mdc: true
---

# [Consommation d'eau]{style="font-size: 50px;font-weight: bold"}

Je suis le gérant d'un syndic d'immeuble, et j'ai donc à disposition une application que me permet de suivre la consommation des différentes personnes dans l'immeuble, mais le code devient un peu fouillit avec tout les appels réseaux que je doit gérer, et je ne parle même pas des états de chargement qui arrivent de partout
J'ai cru comprendre que TanStack Query pourrais m'aider, pouvez vous me guider ?

---
title: List - Demo - Data graph
layout: code-server
transition: view-transition
---

<CodeServer path="water-meter" />

---
title: Redux - Call 
layout: client-calling
transition: view-transition
mdc: true
---

# [Site E-commerce]{style="font-size: 50px;font-weight: bold"}

Je suis l'heureux gérant de l'application de e-commerce leader sur la vente de spécialité Nantaises, qui fait fureur en ce moment
L'application commence à être un peut vieille, on ne devient pas leader en un jour !
Bien que nous gardons l'application à jour, nous utilisons un gros store Redux qui nous permet de tout gérer, et j'ai entendu dire que TanStack Query pourrai simplifier tout ça, pouvez vous m'éclairer ?

---
title: Redux - Demo - Remplacement du store de panier
layout: code-server
transition: view-transition
---

<CodeServer path="nantes-shop" />

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

---
title: Photopea - Call
layout: client-calling
transition: view-transition
mdc: true
---

# [Photopea Like]{style="font-size: 50px;font-weight: bold"}

J'ai besoin de votre aide
Je maintient depuis quelques années un outils comme photoshop en ligne, et j'entend la hype me parler de TanStack Query tout autour de moi
Je ne peux me résoudre à ne pas l'utiliser, pouvez vous m'aider à l'integrer ?

---
title: Photopea - Téléchargement de l'app
transition: view-transition
---

Faux téléchargement infini

---
title: Photopea - Conclusion
transition: view-transition
---

Petite conclusion sur cette application, ou on parle rapidement du fait que la majeur partie de cette appli est client side, avec peut d'intéraction au backend, et que donc TanStack Query est inutile

---
title: Big Latency - Call
layout: client-calling
transition: view-transition
mdc: true
---

# [Medecin itinérant]{style="font-size: 50px;font-weight: bold"}

Je suis le créateur d'une application qui à pour but d'aider les soignants en zone rurale dans la gestion de leur prise de rendez-vous
J'ai déjà TanStack Query dans mon application, cela marche vraiment bien et ça me permet de me passer de store
Cependant, je me suis confronté à un problème, dans des milieux ruraux un peu reculé, l'accès au reseau est parfait un peut chaotique ...
Vais-je devoir me passer de TanStack Query ?

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

---
title: Next Js - Call
layout: client-calling
transition: view-transition
mdc: true
---

# [Next Js App]{style="font-size: 50px;font-weight: bold"}

Je suis conquis par TanStack Query, la facilité d'utilisation et la puissance de l'outils !
Après plusieurs application uniquement client side, je suis en train de construire une application avec Next Js et j'aimerai beaucoup pouvoir profiter des React Server Component, du SSR et de TanStack ...
Dites moi que c'est possible

---
title: Next Js - useSuspenseQuery
transition: view-transition
---

Montrer un exemple avec useSuspenseQuery, qui permet d'intéragir directement avec les `loading.tsx` et `error.tsx` de NextJs
Même si ça ne sert pas qu'a ça


---
title: Next Js - Client Hydration
transition: view-transition
---

Utilisation du HydrationBoundaries avec le helper dehydrate pour permettre de fetch coté serveur tout en gardant le cache

Info importante, possibilité de stream du fait que les query en 'pending' sont serializable 

---
title: Next Js - Experimental ReactQueryStreamedHydration
transition: view-transition
---

Utilisation de ReactQueryStreamedHydration pour une meilleur DX pour faire du fetching de data suspensed coté server (il faut que je creuse la doc j'ai pas full compris encore)

---
title: Tips & Tricks - Call
layout: client-calling
transition: view-transition
mdc: true
---

# [Tips & Tricks]{style="font-size: 50px;font-weight: bold"}

Je suis un gros utilisateur de TanStack Query, je l'utilise partout que je peux
J'ai ouï dire que vous etiez des professionnels, avez vous des petits conseil pour améliorer encore l'utilisation de ce super outil ? 

---
title: Tips & Tricks - useInfiniteQuery
transition: view-transition
---

Utilisation de l'infinite Query pour le scroll infini

---
title: Tips & Tricks - meta
transition: view-transition
---

Utilisation des meta sur le query client pour invalider facilement des query après une mutation

---
title: Tips & Tricks - query key heritage
transition: view-transition
---

Pattern de fichier de clé, pour pouvoir plus facilement invalider plusieurs query d'un coup