import { Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import type { Trip } from "../../../../lib/mock-data";

interface TripCardContentProps {
  trip: Trip;
  isTripDeleting: boolean;
  handleDelete: () => void;
}

export const TripCardContent = ({
  trip,
  isTripDeleting,
  handleDelete,
}: TripCardContentProps) => {
  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col gap-2">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{trip.name}</CardTitle>
              <CardDescription>
                {trip.cities.length} villes • Créé le{" "}
                {new Date(trip.createdAt).toLocaleDateString("fr-FR")}
              </CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={isTripDeleting}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 disabled:opacity-50"
                >
                  {isTripDeleting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Supprimer le voyage</DialogTitle>
                  <DialogDescription>
                    Êtes-vous sûr de vouloir supprimer le voyage "{trip.name}" ?
                    Cette action est irréversible.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" disabled={isTripDeleting}>
                      Annuler
                    </Button>
                  </DialogClose>
                  <Button
                    onClick={handleDelete}
                    disabled={isTripDeleting}
                    className="bg-red-500 hover:bg-red-600 disabled:opacity-50"
                  >
                    {isTripDeleting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Suppression...
                      </>
                    ) : (
                      "Supprimer"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
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
            const angle = start + (spread / (total > 1 ? total - 1 : 1)) * idx;
            const offset = idx * 8;
            return (
              <Image
                key={city.id}
                src={`/trip-planner${city.image}`}
                alt={city.name}
                className="absolute left-1/2 top-1/2 w-40 h-27 object-cover rounded-md shadow-md border-2 border-white"
                style={{
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${offset}px)`,
                  zIndex: 10 + idx,
                }}
                width={128}
                height={128}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
