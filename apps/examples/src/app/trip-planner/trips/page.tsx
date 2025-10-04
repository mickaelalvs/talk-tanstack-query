"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Trip } from "@/lib/mock-data";
import { Header } from "./_components/Header";
import { TripCard } from "./_components/TripCard";

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>();

  const fetchTrips = useCallback(async () => {
    const trips = await fetch("/api/trip-planner/trips");
    setTrips(await trips.json());
  }, []);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const handleDeleteTrip = (tripId: string) => {
    setTrips(trips?.filter((trip) => trip.id !== tripId));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Vos voyages</h2>
            {trips?.length === 0 ? (
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
}
