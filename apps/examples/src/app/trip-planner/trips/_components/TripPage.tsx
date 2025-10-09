import { useEffect, useState } from "react";
import type { Trip } from "../../../../lib/mock-data";
import { listTrips } from "../../_services/list-trips";
import { Header } from "./Header";
import { TripCard } from "./TripCard";
import { TripListEmptyState } from "./TripListEmptyState";
import { TripListSkeleton } from "./TripListSkeleton";

export const TripPage = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setIsPending(true);
        setTrips(await listTrips());
      } finally {
        setIsPending(false);
      }
    };

    fetchTrips();
  }, []);

  const handleDeleteTrip = (tripId: string) => {
    setTrips(trips.filter((trip) => trip.id !== tripId));
  };

  if (isPending) {
    return <TripListSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Vos voyages</h2>
            {trips.length === 0 ? (
              <TripListEmptyState />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trips?.map((trip) => (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                    onDelete={handleDeleteTrip}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
