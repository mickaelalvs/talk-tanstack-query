import { MapPin, Thermometer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type City, mockCities } from "@/lib/mock-data";

export const CitiesList = ({
  searchQuery,
  selectedCities,
  addCityToSelection,
}: {
  searchQuery: string;
  selectedCities: City[];
  addCityToSelection: (city: City) => void;
}) => {
  const filteredCities = mockCities.filter(
    (city) =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.country.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
