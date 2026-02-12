// Test script to add a new city
// Run with: node test-add-city.js

const testCity = {
  name: "Tours",
  country: "France",
  description:
    "Ville historique au cœur de la Touraine, capitale de la région Centre-Val de Loire, célèbre pour sa cathédrale gothique et sa proximité avec les châteaux de la Loire.",
  image: "/tours.jpg",
  weather: {
    temperature: 20,
    condition: "Ensoleillé",
    icon: "☀️",
  },
  attractions: ["Cathédrale Saint-Gatien", "Place Plumereau", "Musée des Beaux-Arts", "Basilique Saint-Martin"],
  bestTimeToVisit: "Avril à octobre",
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
