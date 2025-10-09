"use client";

import { TableIcon } from "lucide-react";
import { Table } from "../../../components/ui/table";
import { useWaterMetersQuery } from "../_hooks/useWaterMetersQuery";
import { MetersFilters } from "./_components/MetersFilters";
import { MetersTableBody } from "./_components/MetersTableBody";
import { MetersTableError } from "./_components/MetersTableError";
import { MetersTableHeader } from "./_components/MetersTableHeader";

export default function MetersPage() {
  const { data: waterMeters, isLoading, error } = useWaterMetersQuery();

  if (error) {
    return (
      <MetersTableError
        error={error instanceof Error ? error.message : "Failed to load data"}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <TableIcon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Compteurs d'Eau
              </h1>
              <p className="text-muted-foreground mt-1">
                Gestion et surveillance de tous les compteurs d'eau du bâtiment
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <MetersFilters />
          <div className="w-full overflow-hidden rounded-md border bg-background">
            <Table className="w-full">
              <MetersTableHeader />
              <MetersTableBody
                isLoading={isLoading}
                waterMeters={waterMeters ?? []}
              />
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
}
