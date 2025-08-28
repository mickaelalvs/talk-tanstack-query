import { Plane } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Header = ({
  selectedCitiesLength,
}: {
  selectedCitiesLength: number;
}) => {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Planificateur de Voyage
            </h1>
            <p className="text-muted-foreground mt-1">
              Découvrez des destinations incroyables et planifiez votre voyage
              parfait
            </p>
          </div>
          <div className="flex gap-2">
            {selectedCitiesLength > 0 && (
              <Badge variant="secondary" className="px-3 py-1">
                {selectedCitiesLength} ville
                {selectedCitiesLength > 1 ? "s" : ""} sélectionnée
                {selectedCitiesLength > 1 ? "s" : ""}
              </Badge>
            )}
            <Link href="/trip-planner/trips">
              <Button className="bg-primary hover:bg-primary/90">
                <Plane className="w-4 h-4 mr-2" />
                Mes Voyages
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
