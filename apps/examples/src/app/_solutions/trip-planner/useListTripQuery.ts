import { useQuery } from "@tanstack/react-query";
import { listTrips } from "../../trip-planner/_services/list-trips";

export const useListTripQuery = () => {
  return useQuery({
    queryFn: listTrips,
    queryKey: ["trips"],
  });
};
