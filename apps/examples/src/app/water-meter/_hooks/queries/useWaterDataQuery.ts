import { useQuery } from "@tanstack/react-query";
import { listWaterData } from "../../_services/list-water-data";

type GraphApiResponse = {
  data: Array<{
    period: string;
    consommation: number;
    moyenne: number;
    date: string;
  }>;
  summary: {
    totalConsumption: number;
    averageConsumption: number;
    previousPeriodAverage: number;
    trend: "up" | "down";
    trendPercentage: number;
    period: string;
  };
};

export const useWaterDataQuery = (period: string) => {
  return useQuery<GraphApiResponse>({
    queryKey: ["water-data"],
    queryFn: () => listWaterData({ period }),
  });
};
