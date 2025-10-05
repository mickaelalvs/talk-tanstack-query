export async function deleteAppointment(id: string) {
  const response = await fetch(
    `/api/itinerant-healthcare/appointments?id=${id}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to delete appointment");
  }

  return response.json();
}
