import { Card } from "../../../components/ui/card";
import type { Trip } from "../../../lib/mock-data";
import { TripCardContent } from "../../trip-planner/trips/_components/TripCardContent";
import { useDeleteTripMutation } from "./useDeleteTripMutation";

export const TripMutationCard = ({ trip }: { trip: Trip }) => {
  const { mutate: deleteTrip, isPending: isTripDeleting } =
    useDeleteTripMutation();

  const handleDelete = async () => {
    deleteTrip(trip.id, {
      onError: (error) => {
        console.error("Error deleting trip:", error);
      },
    });
  };

  return (
    <Card key={trip.id} className="hover:shadow-md transition-shadow">
      <TripCardContent
        trip={trip}
        isTripDeleting={isTripDeleting}
        handleDelete={handleDelete}
      />
    </Card>
  );
};
