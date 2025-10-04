"use client";

import {
  BarChart3,
  Calendar,
  Loader2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Types for the API response
type ConsumptionData = {
  period: string;
  consommation: number;
  moyenne: number;
  date: string;
};

type GraphApiResponse = {
  data: ConsumptionData[];
  summary: {
    totalConsumption: number;
    averageConsumption: number;
    previousPeriodAverage: number;
    trend: "up" | "down";
    trendPercentage: number;
    period: string;
  };
};

// API function to fetch graph data
const fetchGraphData = async (period: string): Promise<GraphApiResponse> => {
  const response = await fetch(`/api/water-meter/graph?period=${period}`);
  if (!response.ok) {
    throw new Error("Failed to fetch graph data");
  }
  return response.json();
};

export default function GraphPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [data, setData] = useState<ConsumptionData[]>([]);
  const [summary, setSummary] = useState<GraphApiResponse["summary"] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetchGraphData(selectedPeriod);
        setData(response.data);
        setSummary(response.summary);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [selectedPeriod]);

  // Calculate values from API data
  const totalConsumption = summary?.totalConsumption || 0;
  const averageConsumption = summary?.averageConsumption || 0;
  const trend = summary?.trend || "up";
  const trendPercentage = summary?.trendPercentage || 0;

  const getPeriodLabel = (period: string) => {
    switch (period) {
      case "today":
        return "Aujourd'hui";
      case "week":
        return "Cette Semaine";
      case "month":
        return "Ce Mois";
      case "semester":
        return "Ce Semestre";
      default:
        return "Période";
    }
  };

  const getUnit = (period: string) => {
    switch (period) {
      case "today":
        return "L/h";
      case "week":
        return "L/jour";
      case "month":
        return "L/jour";
      case "semester":
        return "L/mois";
      default:
        return "L";
    }
  };

  const chartConfig = {
    consommation: {
      label: "Consommation",
      color: "hsl(142, 76%, 36%)", // Vert principal
    },
    moyenne: {
      label: "Moyenne",
      color: "hsl(142, 76%, 56%)", // Vert plus clair
    },
  };

  // biome-ignore lint/suspicious/noExplicitAny: please
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const date = new Date(data.date);

      let dateLabel = "";
      let timeLabel = "";

      switch (selectedPeriod) {
        case "today":
          dateLabel = date.toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          timeLabel = `${date.getHours()}h00`;
          break;
        case "week":
          dateLabel = date.toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          break;
        case "month":
          dateLabel = date.toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          break;
        case "semester":
          dateLabel = date.toLocaleDateString("fr-FR", {
            month: "long",
            year: "numeric",
          });
          break;
      }

      return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg min-w-[250px] z-50">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <p className="font-semibold text-gray-900">{dateLabel}</p>
          </div>

          {timeLabel && (
            <div className="mb-3">
              <p className="text-sm text-gray-600">
                Heure:{" "}
                <span className="font-medium text-gray-900">{timeLabel}</span>
              </p>
            </div>
          )}

          <div className="space-y-3">
            <div className="bg-primary/5 p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm font-medium text-primary">
                  Consommation d'eau
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Volume consommé:</span>
                <span className="font-bold text-primary text-lg">
                  {payload[0].value.toLocaleString("fr-FR")}{" "}
                  {getUnit(selectedPeriod)}
                </span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm text-gray-600">vs moyenne:</span>
                <span
                  className={`text-sm font-medium ${
                    payload[0].value > data.moyenne
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {payload[0].value > data.moyenne ? "+" : ""}
                  {(
                    ((payload[0].value - data.moyenne) / data.moyenne) *
                    100
                  ).toFixed(1)}
                  %
                </span>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-md">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Moyenne période:</span>
                <span className="font-medium text-gray-900">
                  {data.moyenne.toLocaleString("fr-FR")}{" "}
                  {getUnit(selectedPeriod)}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md">
            <h2 className="text-lg font-semibold text-destructive mb-2">
              Erreur de chargement
            </h2>
            <p className="text-muted-foreground mb-4">
              Impossible de charger les données de consommation. Veuillez
              réessayer.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Analyse de Consommation
              </h1>
              <p className="text-muted-foreground mt-1">
                Évolution et tendances de la consommation d'eau du bâtiment
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">
                Filtres temporels
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label
                  htmlFor="period-select"
                  className="text-sm font-medium mb-2 block"
                >
                  Période d'analyse
                </label>
                <Select
                  value={selectedPeriod}
                  onValueChange={setSelectedPeriod}
                >
                  <SelectTrigger
                    id="period-select"
                    className="cursor-pointer bg-white border-2"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today" className="cursor-pointer">
                      Aujourd'hui
                    </SelectItem>
                    <SelectItem value="week" className="cursor-pointer">
                      Cette semaine
                    </SelectItem>
                    <SelectItem value="month" className="cursor-pointer">
                      Ce mois
                    </SelectItem>
                    <SelectItem value="semester" className="cursor-pointer">
                      Ce semestre
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Consommation Totale
              </div>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <span className="text-muted-foreground">Chargement...</span>
                </div>
              ) : (
                <>
                  <div className="text-2xl font-bold text-primary">
                    {totalConsumption.toLocaleString("fr-FR")} L
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {getPeriodLabel(selectedPeriod)}
                  </div>
                </>
              )}
            </div>

            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Consommation Moyenne
              </div>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <span className="text-muted-foreground">Chargement...</span>
                </div>
              ) : (
                <>
                  <div className="text-2xl font-bold text-primary">
                    {averageConsumption.toFixed(1)} {getUnit(selectedPeriod)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Par unité de temps
                  </div>
                </>
              )}
            </div>

            <div
              className={`p-4 rounded-lg border ${
                trend === "up"
                  ? "bg-destructive/5 border-destructive/20"
                  : "bg-primary/5 border-primary/20"
              }`}
            >
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Tendance
              </div>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <span className="text-muted-foreground">Chargement...</span>
                </div>
              ) : (
                <>
                  <div
                    className={`text-2xl font-bold flex items-center gap-2 ${
                      trend === "up" ? "text-destructive" : "text-primary"
                    }`}
                  >
                    {trend === "up" ? (
                      <TrendingUp className="h-5 w-5" />
                    ) : (
                      <TrendingDown className="h-5 w-5" />
                    )}
                    {trendPercentage.toFixed(1)}%
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    vs période précédente
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="w-full">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">
                Consommation d'Eau - {getPeriodLabel(selectedPeriod)}
              </h2>
            </div>
            {isLoading ? (
              <div className="h-[500px] w-full flex items-center justify-center bg-muted/20 rounded-lg border border-dashed border-muted-foreground/20">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                  <p className="text-muted-foreground">
                    Chargement du graphique...
                  </p>
                </div>
              </div>
            ) : (
              <ChartContainer config={chartConfig} className="h-[500px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data}
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
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="consommation"
                      fill="var(--color-consommation)"
                      name="Consommation"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
