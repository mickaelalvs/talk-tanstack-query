# Demos

## Trip-planner

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