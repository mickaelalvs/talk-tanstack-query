import { useQuery } from "@tanstack/react-query";
import { listWaterMeter } from "../../_services/list-water-meter";
import { useMetersFilters } from "../useMetersFilters";

export const useWaterMetersQuery = () => {
  const {
    searchTerm,
    typeFilter,
    floorFilter,
    leakFilter,
    sortField,
    sortDirection,
  } = useMetersFilters();

  const filters = {
    search: searchTerm,
    type: typeFilter,
    etage: floorFilter,
    fuite: leakFilter,
    sortField: sortField,
    sortDirection: sortDirection,
  };

  return useQuery({
    queryFn: () => listWaterMeter(filters),
    queryKey: ["water-meters"],
    select: (data) => data.meters,
  });
};
