import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Trip } from "@/lib/mock-data";

export const TripCard = ({ trip }: { trip: Trip }) => {
  return (
    <Card key={trip.id} className="hover:shadow-md transition-shadow">
      <div className="flex">
        <div className="flex-1 flex flex-col gap-2">
          <CardHeader>
            <CardTitle className="text-lg">{trip.name}</CardTitle>
            <CardDescription>
              {trip.cities.length} villes • Créé le{" "}
              {trip.createdAt.toLocaleDateString("fr-FR")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {trip.cities.map((city) => (
                <Badge key={city.id} variant="outline" className="text-xs">
                  {city.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-32 h-20">
            {trip.cities.map((city, idx) => {
              const total = trip.cities.length;
              const spread = 40;
              const start = -spread / 2;
              const angle =
                start + (spread / (total > 1 ? total - 1 : 1)) * idx;
              const offset = idx * 8;
              return (
                <img
                  key={city.id}
                  src={city.image}
                  alt={city.name}
                  className="absolute left-1/2 top-1/2 w-40 h-27 object-cover rounded-md shadow-md border-2 border-white"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${offset}px)`,
                    zIndex: 10 + idx,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};
