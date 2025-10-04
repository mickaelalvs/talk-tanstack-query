"use client";
import { useState } from "react";
import { CitiesList } from "./CitiesList";
import { CreateTripBanner } from "./CreateTripBanner";
import { Header } from "./Header";
import { SearchInput } from "./SearchInput";

export const TripPlannerPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <SearchInput
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
          <CitiesList searchQuery={searchQuery} />
          <CreateTripBanner />
        </div>
      </div>
    </div>
  );
};
