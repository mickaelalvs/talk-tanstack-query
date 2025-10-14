import { Card } from "../../../../components/ui/card";
import type { Trip } from "../../../../lib/mock-data";
import { TripCardContent } from "../../_components/TripCardContent";

export const TripCard = ({ trip }: { trip: Trip }) => {
  return (
    <Card key={trip.id} className="hover:shadow-md transition-shadow">
      <TripCardContent trip={trip} />
    </Card>
  );
};
