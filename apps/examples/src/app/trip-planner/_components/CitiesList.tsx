import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import type { City } from "../../../lib/mock-data";
import { selectedCitiesAtom } from "../../../lib/store";
import { listCities } from "../_services/list-cities";
import { CitiesListError } from "./CitiesListError";
import { CitiesListSkeleton } from "./CitiesListSkeleton";
import { CityCard } from "./CityCard";

export const CitiesList = ({ searchQuery }: { searchQuery: string }) => {
  const [selectedCities] = useAtom(selectedCitiesAtom);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await listCities();

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
    return <CitiesListSkeleton />;
  }

  if (error) {
    return <CitiesListError error={error} />;
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${
        selectedCities.length > 0 ? "mb-24" : ""
      }`}
    >
      {filteredCities.map((city) => (
        <CityCard key={city.id} city={city} />
      ))}
    </div>
  );
};
