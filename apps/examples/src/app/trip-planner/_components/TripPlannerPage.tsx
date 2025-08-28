"use client";
import { useState } from "react";
import type { City } from "@/lib/mock-data";
import { CitiesList } from "./CitiesList";
import { CreateTripBanner } from "./CreateTripBanner";
import { Header } from "./Header";
import { SearchInput } from "./SearchInput";

export const TripPlannerPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCities, setSelectedCities] = useState<City[]>([]);

  const addCityToSelection = (city: City) => {
    if (!selectedCities.find((c) => c.id === city.id)) {
      setSelectedCities([...selectedCities, city]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header selectedCitiesLength={0} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <SearchInput
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
          <CitiesList
            searchQuery={searchQuery}
            selectedCities={selectedCities}
            addCityToSelection={addCityToSelection}
          />
          <CreateTripBanner
            selectedCities={selectedCities}
            setSelectedCities={setSelectedCities}
          />
        </div>
      </div>
    </div>
  );
};
