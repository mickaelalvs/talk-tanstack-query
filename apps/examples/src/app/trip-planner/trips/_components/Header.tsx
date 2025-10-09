import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../../components/ui/button";

export const Header = () => {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">Mes Voyages</h1>
            <p className="text-muted-foreground mt-1">
              Gérez vos aventures planifiées et créez de nouveaux itinéraires
            </p>
          </div>
          <Link href="/trip-planner">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
