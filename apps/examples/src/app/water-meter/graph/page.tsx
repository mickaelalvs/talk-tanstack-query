"use client";

import { BarChart3 } from "lucide-react";
import { useState } from "react";
import { useWaterDataQuery } from "../_hooks/useWaterDataQuery";
import { getPeriodLabel } from "../_utils/water-meters.utils";
import { GraphChart } from "./_components/GraphChart";
import { GraphErrorState } from "./_components/GraphErrorState";
import { GraphFilters } from "./_components/GraphFilters";
import { GraphSummary } from "./_components/GraphSummary";

export default function GraphPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const { error } = useWaterDataQuery(selectedPeriod);

  if (error) {
    return <GraphErrorState />;
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
          <GraphFilters
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
          />

          <GraphSummary period={selectedPeriod} />

          <div className="w-full">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">
                Consommation d'Eau - {getPeriodLabel(selectedPeriod)}
              </h2>
            </div>

            <GraphChart period={selectedPeriod} />
          </div>
        </div>
      </main>
    </div>
  );
}
