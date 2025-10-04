export const deleteTrip = async (tripId: string) => {
  const response = await fetch(`/api/trip-planner/trips/${tripId}`, {
    method: "DELETE",
  });
  return response.json();
};
