import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";

export const TripListEmptyState = () => {
  return (
    <Card>
      <CardContent className="text-center py-12">
        <p className="text-muted-foreground mb-4">
          Aucun voyage pour le moment. Créez votre premier voyage !
        </p>
        <Link href="/trip-planner">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Commencer à planifier
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
