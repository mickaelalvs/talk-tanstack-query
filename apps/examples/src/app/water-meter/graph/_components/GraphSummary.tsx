import { Loader2, TrendingDown, TrendingUp } from "lucide-react";
import { useWaterDataQuery } from "../../_hooks/useWaterDataQuery";
import { getPeriodLabel, getUnit } from "../../_utils/water-meters.utils";

export const GraphSummary = ({ period }: { period: string }) => {
  const { data, isLoading } = useWaterDataQuery(period);

  return (
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
              {data?.summary?.totalConsumption.toLocaleString("fr-FR")} L
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {getPeriodLabel(period)}
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
              {data?.summary?.averageConsumption.toFixed(1)} {getUnit(period)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Par unité de temps
            </div>
          </>
        )}
      </div>

      <div
        className={`p-4 rounded-lg border ${
          data?.summary?.trend === "up"
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
                data?.summary?.trend === "up"
                  ? "text-destructive"
                  : "text-primary"
              }`}
            >
              {data?.summary?.trend === "up" ? (
                <TrendingUp className="h-5 w-5" />
              ) : (
                <TrendingDown className="h-5 w-5" />
              )}
              {data?.summary?.trendPercentage.toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              vs période précédente
            </div>
          </>
        )}
      </div>
    </div>
  );
};
