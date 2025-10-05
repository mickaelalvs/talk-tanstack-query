import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { WaterMeter } from "../../_types/water-meter.type";

export const MetersTableBody = ({
  isLoading,
  waterMeters,
}: {
  isLoading: boolean;
  waterMeters: WaterMeter[];
}) => {
  if (isLoading) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={8} className="text-center py-8">
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="text-muted-foreground">
                Chargement des compteurs...
              </span>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (waterMeters.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={8} className="text-center py-8">
            <div className="text-muted-foreground">Aucun compteur trouvé</div>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {(waterMeters ?? []).map((meter) => (
        <TableRow key={meter.id}>
          <TableCell className="font-medium">{meter.numero}</TableCell>
          <TableCell>{meter.etage}</TableCell>
          <TableCell>
            <Badge variant="outline">{meter.type}</Badge>
          </TableCell>
          <TableCell>{meter.proprietaire}</TableCell>
          <TableCell className="text-right">
            {meter.consommation.toFixed(1)} L
          </TableCell>
          <TableCell>
            {meter.fuiteDetectee ? (
              <Badge variant="destructive">Détectée</Badge>
            ) : (
              <Badge variant="secondary">Aucune</Badge>
            )}
          </TableCell>
          <TableCell>
            {new Date(meter.dernierReleve).toLocaleDateString("fr-FR")}
          </TableCell>
          <TableCell>
            <Badge
              variant={
                meter.statut === "Actif"
                  ? "default"
                  : meter.statut === "Maintenance"
                    ? "secondary"
                    : "outline"
              }
            >
              {meter.statut}
            </Badge>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
