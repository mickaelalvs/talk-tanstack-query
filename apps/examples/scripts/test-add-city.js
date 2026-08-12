// Test script to add a new city
// Run with: node test-add-city.js

const testCity = {
  name: "Bordeaux",
  country: "France",
  description:
    "Capitale mondiale du vin au bord de la Garonne, classée au patrimoine mondial de l'UNESCO pour son architecture du XVIIIe siècle et ses quais réaménagés.",
  image: "/miroir-eau.jpeg",
  weather: {
    temperature: 22,
    condition: "Ensoleillé",
    icon: "☀️",
  },
  attractions: ["Place de la Bourse", "Cité du Vin", "Grosse Cloche", "Basilique Saint-Michel"],
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
