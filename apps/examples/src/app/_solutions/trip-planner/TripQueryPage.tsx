
import { Header } from "../../trip-planner/trips/_components/Header";
import { TripListEmptyState } from "../../trip-planner/trips/_components/TripListEmptyState";
import { TripListSkeleton } from "../../trip-planner/trips/_components/TripListSkeleton";
import { TripMutationCard } from "./TripMutationCard";
import { useListTripQuery } from "./useListTripQuery";

export const TripQueryPage = () => {
  const { data: trips = [], isPending } = useListTripQuery();

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
                {trips.map((trip) => (
                  <TripMutationCard key={trip.id} trip={trip} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
