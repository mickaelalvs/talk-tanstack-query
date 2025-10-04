import type { Trip } from "@/lib/mock-data";

export const listTrips = async (): Promise<Trip[]> => {
  const response = await fetch("/api/trip-planner/trips");
  return response.json();
};
