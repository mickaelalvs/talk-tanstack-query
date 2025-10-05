import { type NextRequest, NextResponse } from "next/server";

export type WaterMeter = {
  id: string;
  numero: string;
  etage: number;
  type: "Résidentiel" | "Commercial" | "Commun";
  proprietaire: string;
  consommation: number;
  fuiteDetectee: boolean;
  dernierReleve: string;
  statut: "Actif" | "Inactif" | "Maintenance";
};

const mockData: WaterMeter[] = [
  {
    id: "1",
    numero: "C001",
    etage: 1,
    type: "Résidentiel",
    proprietaire: "Dupont Marie",
    consommation: 45.2,
    fuiteDetectee: false,
    dernierReleve: "2024-01-15",
    statut: "Actif",
  },
  {
    id: "2",
    numero: "C002",
    etage: 1,
    type: "Résidentiel",
    proprietaire: "Martin Pierre",
    consommation: 52.8,
    fuiteDetectee: true,
    dernierReleve: "2024-01-14",
    statut: "Actif",
  },
  {
    id: "3",
    numero: "C003",
    etage: 2,
    type: "Commercial",
    proprietaire: "Boulangerie Moderne",
    consommation: 125.6,
    fuiteDetectee: false,
    dernierReleve: "2024-01-15",
    statut: "Actif",
  },
  {
    id: "4",
    numero: "C004",
    etage: 2,
    type: "Résidentiel",
    proprietaire: "Leblanc Sophie",
    consommation: 38.9,
    fuiteDetectee: false,
    dernierReleve: "2024-01-13",
    statut: "Actif",
  },
  {
    id: "5",
    numero: "C005",
    etage: 3,
    type: "Résidentiel",
    proprietaire: "Garcia Carlos",
    consommation: 67.3,
    fuiteDetectee: true,
    dernierReleve: "2024-01-15",
    statut: "Actif",
  },
  {
    id: "6",
    numero: "C006",
    etage: 3,
    type: "Commun",
    proprietaire: "Parties Communes",
    consommation: 89.4,
    fuiteDetectee: false,
    dernierReleve: "2024-01-14",
    statut: "Actif",
  },
  {
    id: "7",
    numero: "C007",
    etage: 4,
    type: "Résidentiel",
    proprietaire: "Moreau Jean",
    consommation: 41.7,
    fuiteDetectee: false,
    dernierReleve: "2024-01-12",
    statut: "Maintenance",
  },
  {
    id: "8",
    numero: "C008",
    etage: 4,
    type: "Résidentiel",
    proprietaire: "Bernard Claire",
    consommation: 55.1,
    fuiteDetectee: false,
    dernierReleve: "2024-01-15",
    statut: "Actif",
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Extract query parameters
    const search = searchParams.get("search") || "";
    const type = searchParams.get("type") || "";
    const statut = searchParams.get("statut") || "";
    const etage = searchParams.get("etage") || "";
    const fuiteDetectee = searchParams.get("fuiteDetectee");
    const sortBy = searchParams.get("sortBy") || "numero";
    const sortDirection = searchParams.get("sortDirection") || "asc";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    // Filter meters based on query parameters
    const filteredMeters = mockData.filter((meter) => {
      const matchesSearch =
        search === "" ||
        meter.numero.toLowerCase().includes(search.toLowerCase()) ||
        meter.proprietaire.toLowerCase().includes(search.toLowerCase());

      const matchesType = type === "" || type === "all" || meter.type === type;
      const matchesStatut =
        statut === "" || statut === "all" || meter.statut === statut;
      const matchesEtage =
        etage === "" || etage === "all" || meter.etage.toString() === etage;
      const matchesFuiteDetectee =
        fuiteDetectee === null ||
        fuiteDetectee === "" ||
        fuiteDetectee === "all" ||
        (fuiteDetectee === "oui" && meter.fuiteDetectee) ||
        (fuiteDetectee === "non" && !meter.fuiteDetectee);

      return (
        matchesSearch &&
        matchesType &&
        matchesStatut &&
        matchesEtage &&
        matchesFuiteDetectee
      );
    });

    // Sort meters
    filteredMeters.sort((a, b) => {
      let aValue = a[sortBy as keyof WaterMeter];
      let bValue = b[sortBy as keyof WaterMeter];

      // Handle string comparison
      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      // Handle date comparison
      if (sortBy === "dernierReleve") {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }

      // Apply sort direction
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    // Pagination
    const totalItems = filteredMeters.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedMeters = filteredMeters.slice(startIndex, endIndex);

    // Calculate summary statistics
    const totalConsumption = filteredMeters.reduce(
      (sum, meter) => sum + meter.consommation,
      0,
    );
    const averageConsumption = totalConsumption / filteredMeters.length;
    const activeMeters = filteredMeters.filter(
      (meter) => meter.statut === "Actif",
    ).length;
    const metersWithLeaks = filteredMeters.filter(
      (meter) => meter.fuiteDetectee,
    ).length;

    return NextResponse.json({
      meters: paginatedMeters,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      filters: {
        search,
        type,
        statut,
        etage,
        fuiteDetectee:
          fuiteDetectee === "true"
            ? true
            : fuiteDetectee === "false"
              ? false
              : null,
        sortBy,
      },
      summary: {
        totalConsumption,
        averageConsumption,
        activeMeters,
        metersWithLeaks,
        totalMeters: filteredMeters.length,
      },
    });
  } catch (error) {
    console.error("Error fetching water meters:", error);
    return NextResponse.json(
      { error: "Failed to fetch water meters" },
      { status: 500 },
    );
  }
}
