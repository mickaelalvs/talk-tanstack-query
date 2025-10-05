import type { WaterMeter, WaterMeterFilters } from "../_types/water-meter.type";

interface WaterMeterResponse {
  meters: WaterMeter[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export const listWaterMeter = async (
  filters: WaterMeterFilters,
): Promise<WaterMeterResponse> => {
  const params = new URLSearchParams();

  const filterMap: { [key: string]: string } = {
    search: "search",
    type: "type",
    etage: "etage",
    fuite: "fuiteDetectee",
    sortField: "sortBy",
    sortDirection: "sortDirection",
  };

  for (const [key, param] of Object.entries(filterMap)) {
    const value = filters[key as keyof WaterMeterFilters];
    if (
      value &&
      (!["type", "etage", "fuite"].includes(key) || value !== "all")
    ) {
      params.append(param, value);
    }
  }

  const response = await fetch(`/api/water-meter/meters?${params.toString()}`);
  return response.json();
};
