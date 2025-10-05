export const listWaterData = async ({ period }: { period: string }) => {
  const response = await fetch(`/api/water-meter/graph?period=${period}`);
  return response.json();
};
