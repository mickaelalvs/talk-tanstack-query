import { TableHead, TableHeader, TableRow } from "../../../../components/ui/table";
import { useMetersFilters } from "../../_hooks/useMetersFilters";
import { SortButton } from "./SortButton";

export const MetersTableHeader = () => {
  const { handleSort } = useMetersFilters();

  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">
          <SortButton field="numero" handleSort={handleSort}>
            Numéro
          </SortButton>
        </TableHead>
        <TableHead className="w-[80px]">
          <SortButton field="etage" handleSort={handleSort}>
            Étage
          </SortButton>
        </TableHead>
        <TableHead className="w-[120px]">
          <SortButton field="type" handleSort={handleSort}>
            Type
          </SortButton>
        </TableHead>
        <TableHead className="w-[200px]">
          <SortButton field="proprietaire" handleSort={handleSort}>
            Propriétaire
          </SortButton>
        </TableHead>
        <TableHead className="w-[120px] text-right">
          <SortButton field="consommation" handleSort={handleSort}>
            Consommation
          </SortButton>
        </TableHead>
        <TableHead className="w-[100px]">
          <SortButton field="fuiteDetectee" handleSort={handleSort}>
            Fuite
          </SortButton>
        </TableHead>
        <TableHead className="w-[120px]">
          <SortButton field="dernierReleve" handleSort={handleSort}>
            Dernier Relevé
          </SortButton>
        </TableHead>
        <TableHead className="w-[100px]">
          <SortButton field="statut" handleSort={handleSort}>
            Statut
          </SortButton>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};
