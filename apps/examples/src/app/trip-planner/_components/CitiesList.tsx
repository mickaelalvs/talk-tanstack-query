import { Loader2, MapPin, Thermometer } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { City } from "@/lib/mock-data";

export const CitiesList = ({
  searchQuery,
  selectedCities,
  addCityToSelection,
}: {
  searchQuery: string;
  selectedCities: City[];
  addCityToSelection: (city: City) => void;
}) => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/trip-planner/cities");

        if (!response.ok) {
          throw new Error("Failed to fetch cities");
        }

        const data = await response.json();
        setCities(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const filteredCities = cities.filter(
    (city) =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.country.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Chargement des villes...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-destructive mb-2">
            Erreur lors du chargement des villes
          </p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${
        selectedCities.length > 0 ? "mb-24" : ""
      }`}
    >
      {filteredCities.map((city) => (
        <Card
          key={city.id}
          className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full pt-0"
        >
          <div className="relative overflow-hidden aspect-video">
            <img
              src={city.image || "/placeholder.svg"}
              alt={city.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center gap-2 group-hover:bg-white/95 transition-colors">
              <span className="text-lg">{city.weather.icon}</span>
              <span className="font-medium">{city.weather.temperature}°C</span>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  {city.name}
                </CardTitle>
                <Badge variant="secondary">{city.country}</Badge>
              </div>
              <CardDescription>{city.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Thermometer className="w-4 h-4" />
                  {city.weather.condition}
                </div>
                <div className="flex flex-wrap gap-1">
                  {city.attractions.slice(0, 3).map((attraction) => (
                    <Badge
                      key={attraction}
                      variant="outline"
                      className="text-xs"
                    >
                      {attraction}
                    </Badge>
                  ))}
                  {city.attractions.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{city.attractions.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
              <Button
                onClick={() => addCityToSelection(city)}
                disabled={selectedCities.some((c) => c.id === city.id)}
                className="w-full mt-4 group-hover:shadow-md transition-all duration-200"
                variant={
                  selectedCities.some((c) => c.id === city.id)
                    ? "secondary"
                    : "default"
                }
              >
                {selectedCities.some((c) => c.id === city.id)
                  ? "Ajouté au voyage"
                  : "Ajouter au voyage"}
              </Button>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
};
