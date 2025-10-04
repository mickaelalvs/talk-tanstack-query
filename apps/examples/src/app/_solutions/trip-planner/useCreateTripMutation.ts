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
