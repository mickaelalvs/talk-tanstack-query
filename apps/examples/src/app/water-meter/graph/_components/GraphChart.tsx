import { Loader2 } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { useWaterDataQuery } from "../../_hooks/useWaterDataQuery";
import { GraphTooltip } from "./GraphTooltip";

export const GraphChart = ({ period }: { period: string }) => {
  const { data, isLoading } = useWaterDataQuery(period);

  const consumptionData = data?.data || [];

  const chartConfig = {
    consommation: {
      label: "Consommation",
      color: "hsl(142, 76%, 36%)",
    },
    moyenne: {
      label: "Moyenne",
      color: "hsl(142, 76%, 56%)",
    },
  };

  if (isLoading) {
    return (
      <div className="h-[500px] w-full flex items-center justify-center bg-muted/20 rounded-lg border border-dashed border-muted-foreground/20">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Chargement du graphique...</p>
        </div>
      </div>
    );
  }
  return (
    <ChartContainer config={chartConfig} className="h-[500px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={consumptionData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--muted-foreground))"
            opacity={0.3}
          />
          <XAxis
            dataKey="period"
            tick={{
              fontSize: 12,
              fill: "hsl(var(--muted-foreground))",
            }}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{
              fontSize: 12,
              fill: "hsl(var(--muted-foreground))",
            }}
          />
          <Tooltip content={<GraphTooltip period={period} />} />
          <Bar
            dataKey="consommation"
            fill="var(--color-consommation)"
            name="Consommation"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
