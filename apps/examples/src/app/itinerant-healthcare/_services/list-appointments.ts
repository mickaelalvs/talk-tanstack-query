import type { Appointment } from "../../../lib/database";

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export const listAppointments = async () => {
  const response = await fetch("/api/itinerant-healthcare/appointments");
  const result: ApiResponse<Appointment[]> = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error || "Failed to fetch appointments");
  }

  return result.data || [];
};
