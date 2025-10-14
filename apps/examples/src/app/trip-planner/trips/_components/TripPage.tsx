import { useEffect, useState } from "react";
import type { Trip } from "../../../../lib/mock-data";
import { Header } from "../../_components/TripHeader";
import { TripListEmptyState } from "../../_components/TripListEmptyState";
import { TripListSkeleton } from "../../_components/TripListSkeleton";
import { listTrips } from "../../_services/list-trips";
import { TripCard } from "./TripCard";

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
                  <TripCard key={trip.id} trip={trip} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
