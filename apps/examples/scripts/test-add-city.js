// Test script to add a new city
// Run with: node test-add-city.js

const testCity = {
  name: "Nantes",
  country: "France",
  description:
    "La cité des Ducs de Bretagne, ville historique et créative au bord de la Loire.",
  image: "/nantes-chateau-ducs.png",
  weather: {
    temperature: 18,
    condition: "Nuageux",
    icon: "☁️",
  },
  attractions: ["Château des Ducs de Bretagne", "Passage Pommeraye", "Île de Versailles", "Tour LU"],
  bestTimeToVisit: "Mai à septembre",
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
