import { parseAsString, parseAsStringEnum, useQueryState } from "nuqs";
import { useCallback, useRef } from "react";

export type SortField =
  | "numero"
  | "etage"
  | "type"
  | "proprietaire"
  | "consommation"
  | "fuiteDetectee"
  | "dernierReleve"
  | "statut";
export type SortDirection = "asc" | "desc";

import { useQueryClient } from "@tanstack/react-query";

export const useMetersFilters = () => {
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useQueryState(
    "q",
    parseAsString.withDefault(""),
  );

  const debounceTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const debouncedSetSearchTerm = useCallback(
    (value: string) => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        setSearchTerm(value);
        queryClient.removeQueries({ queryKey: ["water-meters"] });
      }, 300);
    },
    [setSearchTerm, queryClient],
  );

  const [typeFilter, setTypeFilter] = useQueryState(
    "type",
    parseAsString.withDefault("all"),
  );

  const [floorFilter, setFloorFilter] = useQueryState(
    "etage",
    parseAsString.withDefault("all"),
  );

  const [leakFilter, setLeakFilter] = useQueryState(
    "fuite",
    parseAsString.withDefault("all"),
  );

  const [sortField, setSortField] = useQueryState(
    "sortBy",
    parseAsStringEnum<SortField>([
      "numero",
      "etage",
      "type",
      "proprietaire",
      "consommation",
      "fuiteDetectee",
      "dernierReleve",
      "statut",
    ]).withDefault("numero"),
  );

  const [sortDirection, setSortDirection] = useQueryState(
    "sortDirection",
    parseAsStringEnum<SortDirection>(["asc", "desc"]).withDefault("asc"),
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return {
    searchTerm,
    setSearchTerm: debouncedSetSearchTerm,
    typeFilter,
    setTypeFilter,
    floorFilter,
    setFloorFilter,
    leakFilter,
    setLeakFilter,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    handleSort,
  };
};
