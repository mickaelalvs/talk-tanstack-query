// Test script to add a new city
// Run with: node test-add-city.js

const testCity = {
  name: "Grenoble",
  country: "France",
  description:
    "Capitale des Alpes, ville universitaire dynamique entourée de montagnes, réputée pour la recherche et l’innovation.",
  image: "/grenoble-bastille.jpg",
  weather: {
    temperature: 20,
    condition: "Ensoleillé",
    icon: "☀️",
  },
  attractions: [
    "La Bastille",
    "Musée de Grenoble",
    "Téléphérique de Grenoble",
    "Place Victor Hugo"
  ],
  bestTimeToVisit: "Mai à octobre",
};

async function addCity() {
  try {
    const response = await fetch(
      "http://localhost:1234/api/trip-planner/cities",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testCity),
      },
    );

    const result = await response.json();

    if (response.ok) {
      console.log("✅ City added successfully:", result);
    } else {
      console.error("❌ Error adding city:", result);
    }
  } catch (error) {
    console.error("❌ Network error:", error);
  }
}

addCity();
