export const createTrip = async (tripToCreate: {
  name: string;
  cityIds: string[];
}) => {
  return await fetch("/api/trip-planner/trips", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tripToCreate),
  });
};
