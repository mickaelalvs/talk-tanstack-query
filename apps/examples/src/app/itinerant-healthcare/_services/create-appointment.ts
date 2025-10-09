import type { Appointment, CreateAppointmentRequest } from "../../../lib/database";

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export const createAppointment = async (
  appointment: CreateAppointmentRequest,
): Promise<Appointment> => {
  const response = await fetch("/api/itinerant-healthcare/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointment),
  });

  const result: ApiResponse<Appointment> = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error || "Failed to create appointment");
  }

  return result.data;
};
