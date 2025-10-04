import { useMutation } from "@tanstack/react-query";
import type { Trip } from "@/lib/mock-data";
import { deleteTrip } from "../../trip-planner/_services/delete-trip";

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
