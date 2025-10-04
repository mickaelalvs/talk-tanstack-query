export const listCities = async () => {
  return await fetch("/api/trip-planner/cities");
};
