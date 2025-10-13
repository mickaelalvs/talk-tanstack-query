import { useState } from "react";
import { Card } from "../../../../components/ui/card";
import type { Trip } from "../../../../lib/mock-data";
import { TripCardContent } from "../../_components/TripCardContent";
import { deleteTrip } from "../../_services/delete-trip";

export const TripCard = ({
  trip,
  onDelete,
}: {
  trip: Trip;
  onDelete?: (tripId: string) => void;
}) => {
  const [isTripDeleting, setIsTripDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsTripDeleting(true);
      const response = await deleteTrip(trip.id);

      if (response.success) {
        onDelete?.(trip.id);
      } else {
        console.error("Failed to delete trip:", await response.text());
      }
    } catch (error) {
      console.error("Error deleting trip:", error);
    } finally {
      setIsTripDeleting(false);
    }
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
