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

export type WaterMeterFilters = {
  search: string;
  type: string;
  etage: string;
  fuite: string;
  sortField: string;
  sortDirection: string;
};
