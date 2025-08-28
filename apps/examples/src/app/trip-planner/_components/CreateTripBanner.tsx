import { X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { City, Trip } from "@/lib/mock-data";

export const CreateTripBanner = ({
  selectedCities,
  setSelectedCities,
}: {
  selectedCities: City[];
  setSelectedCities: (cities: City[]) => void;
}) => {
  const [newTripName, setNewTripName] = useState("");
  const [trips, setTrips] = useState<Trip[]>([]);

  if (selectedCities.length === 0) {
    return null;
  }

  const createTrip = () => {
    if (newTripName.trim() && selectedCities.length > 0) {
      const newTrip: Trip = {
        id: Date.now().toString(),
        name: newTripName.trim(),
        cities: selectedCities,
        createdAt: new Date(),
      };
      setTrips([...trips, newTrip]);
      setSelectedCities([]);
      setNewTripName("");
    }
  };

  const removeCityFromSelection = (cityId: string) => {
    setSelectedCities(selectedCities.filter((c) => c.id !== cityId));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-blue-300/80 backdrop-blur-sm border-t shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 bg-card/50 rounded-lg p-4">
            <Input
              placeholder="Nom du voyage..."
              value={newTripName}
              onChange={(e) => setNewTripName(e.target.value)}
              className="max-w-xs bg-white"
            />

            <div className="flex flex-wrap gap-1 flex-1">
              {selectedCities.map((city) => (
                <Badge
                  key={city.id}
                  variant="secondary"
                  className="flex items-center gap-1 text-xs p-1"
                >
                  {city.name}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 w-3 h-3 hover:bg-fuchsia-50"
                    onClick={() => removeCityFromSelection(city.id)}
                  >
                    <X className="w-2 h-2" />
                  </Button>
                </Badge>
              ))}
            </div>

            <Button
              onClick={createTrip}
              disabled={!newTripName.trim() || selectedCities.length === 0}
              className="bg-primary hover:bg-primary/90"
            >
              Créer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
