# Demos

## Trip-planner - Timé 10:15

- Faire un tour de l'app, créer un voyage pour qu'on puisse voir le fonctionnement

- Faire un tour du code, TripPlannerPage pour la liste des villes, TripPage pour la liste des voyages

- Créer un fichier `useListTripsQuery`, dans lequel on fait la query pour récupérer les voyages

```tsx
import { useQuery } from "@tanstack/react-query";
import { listTrips } from "../../trip-planner/_services/list-trips";

export const useListTripQuery = () => {
  return useQuery({
    queryFn: listTrips,
    queryKey: ["trips"],
  });
};
```

- l'utiliser dans le fichier TripPage pour récupérer la liste, bien commenter la suppression pour éviter que ça bug

- Tester sur l'app

- Créer un fichier `useCreateTripMutation`

```tsx
import { useMutation } from "@tanstack/react-query";
import { createTrip } from "../../trip-planner/_services/create-trip";

export const useCreateTripMutation = () => {
  return useMutation({
    mutationFn: createTrip,
    mutationKey: ["createTrip"],
    onSuccess: (_data, _variables, _results, context) => {
      context.client.refetchQueries({ queryKey: ["trips"] });
    },
  });
};
```

- L'utiliser dans le fichier `CreateTripBanner`, ne pas oublier le onSuccess pour reset le form

- Montrer le résultat sur l'app

- Créer un fichier `useDeleteTripMutation`

```tsx
import { useMutation } from "@tanstack/react-query";
import { deleteTrip } from "../../trip-planner/_services/delete-trip";
import { Trip } from "../../../lib/mock-data";

export const useDeleteTripMutation = () => {
  return useMutation({
    mutationFn: deleteTrip,
    mutationKey: ["deleteTrip"],
    onSuccess: (_data, tripId, _results, context) => {
      context.client.setQueryData(["trips"], (old: Trip[]) =>
        old.filter((trip) => trip.id !== tripId),
      );
    },
  });
};
```

- L'utiliser dans le fichier `TripCard` pour supprimer un voyage

- Montrer sur l'app

## Water Meters - Timé 4:00

- Passer sur l'app, montrer rapidement les filtres sur le graph et le tableau

- Passer dans le code, montrer qu'on a déjà les query

- Aller dans le `useMetersFilters`, montrer qu'on remove les query à chaque changement de filtre

- Les enlever tous

- Aller voir dans l'app, remarquer que du coup plus rien ne marche

- ajouter les filtres dans la clé du `useWaterMetersQuery.ts`

- Retourner sur l'app, tout marche, regarder un peu le devtools pour montrer qu'on a plusieurs entrée de cache différentes

- Faire pareil pour le graph, le remove query est dans le composant `GraphFilters`

## Nantes shop - Timé 5:55

- Passer sur l'app, montrer qu'on peut ajouter une cathédrale au panier

- Passer dans le code, rapidement sur le slice redux pour montrer le boilerplate que cela représente

- "On a déjà les hooks custom à dispo"

- Remplacer tout les endroits ou on utilise le useAppSelector (`Cart.tsx`, `CartDropdownActions`, `CartDropdownContent`)

- Tester que l'on récupère bien le panier, essayer d'ajouter un produit, ça n'ajoute rien

- Remplacer l'appel à useCartAction dans la `ProductCard`

- Montrer que ça marche sur l'app

- Remplacer les appels à useCartAction dans la `CartCardAction`

- Montrer que tout marche

## Medecin itinérant - Timé 3:45

- Passer sur l'app, montrer les temps de chargements abusés

- Aller dans le code, regarder la mutation

- Ajouter la possibilité d'avoir de l'optimistic rendering

```tsx
    onMutate: async (variables, context) => {
      await context.client.cancelQueries({ queryKey: ["appointments"] });

      context.client.setQueryData(
        ["appointments"],
        (old: Appointment[] | undefined) => {
          return old
            ? [...old, optimisticAppointment]
            : [optimisticAppointment];
          return updated;
        },
      );
    },
```

- Montrer qu'ajouter un rendez vous l'ajoute automatiquement

- Montrer sur les deux vue potentiellement


Total temps : 3:45 + 5:55 + 4:00 + 10:15