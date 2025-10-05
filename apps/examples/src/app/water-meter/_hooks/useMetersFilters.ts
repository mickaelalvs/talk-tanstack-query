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

  const [searchTerm, setSearchTermRaw] = useQueryState(
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
        setSearchTermRaw(value);
        queryClient.removeQueries({ queryKey: ["water-meters"] });
      }, 300);
    },
    [setSearchTermRaw, queryClient],
  );

  const [typeFilter, setTypeFilterRaw] = useQueryState(
    "type",
    parseAsString.withDefault("all"),
  );

  const setTypeFilter = useCallback(
    (value: string) => {
      setTypeFilterRaw(value);
      queryClient.removeQueries({ queryKey: ["water-meters"] });
    },
    [setTypeFilterRaw, queryClient],
  );

  const [floorFilter, setFloorFilterRaw] = useQueryState(
    "etage",
    parseAsString.withDefault("all"),
  );

  const setFloorFilter = useCallback(
    (value: string) => {
      setFloorFilterRaw(value);
      queryClient.removeQueries({ queryKey: ["water-meters"] });
    },
    [setFloorFilterRaw, queryClient],
  );

  const [leakFilter, setLeakFilterRaw] = useQueryState(
    "fuite",
    parseAsString.withDefault("all"),
  );

  const setLeakFilter = useCallback(
    (value: string) => {
      setLeakFilterRaw(value);
      queryClient.removeQueries({ queryKey: ["water-meters"] });
    },
    [setLeakFilterRaw, queryClient],
  );

  const [sortField, setSortFieldRaw] = useQueryState(
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

  const setSortField = useCallback(
    (value: SortField) => {
      setSortFieldRaw(value);
      queryClient.removeQueries({ queryKey: ["water-meters"] });
    },
    [setSortFieldRaw, queryClient],
  );

  const [sortDirection, setSortDirectionRaw] = useQueryState(
    "sortDirection",
    parseAsStringEnum<SortDirection>(["asc", "desc"]).withDefault("asc"),
  );

  const setSortDirection = useCallback(
    (value: SortDirection) => {
      setSortDirectionRaw(value);
      queryClient.removeQueries({ queryKey: ["water-meters"] });
    },
    [setSortDirectionRaw, queryClient],
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
