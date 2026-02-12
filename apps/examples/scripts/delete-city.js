// Script to delete a city by name
// Run with: node delete-city.js "City Name"
// Example: node delete-city.js "Tours"

const cityNameToDelete = process.argv[2];

if (!cityNameToDelete) {
  console.error("❌ Please provide a city name to delete");
  console.log("Usage: node delete-city.js \"City Name\"");
  console.log("Example: node delete-city.js \"Tours\"");
  process.exit(1);
}

async function deleteCity() {
  try {
    // First, fetch all cities to find the one to delete
    console.log(`🔍 Searching for city: ${cityNameToDelete}`);
    const fetchResponse = await fetch(
      "http://localhost:1234/api/trip-planner/cities",
    );

    if (!fetchResponse.ok) {
      console.error("❌ Error fetching cities");
      return;
    }

    const cities = await fetchResponse.json();
    const cityToDelete = cities.find(
      (city) => city.name.toLowerCase() === cityNameToDelete.toLowerCase(),
    );

    if (!cityToDelete) {
      console.error(
        `❌ City "${cityNameToDelete}" not found in the database`,
      );
      console.log("\nAvailable cities:");
      cities.forEach((city) => console.log(`  - ${city.name} (${city.country})`));
      return;
    }

    console.log(`Found city: ${cityToDelete.name} (ID: ${cityToDelete.id})`);

    // Delete the city
    const deleteResponse = await fetch(
      `http://localhost:1234/api/trip-planner/cities/${cityToDelete.id}`,
      {
        method: "DELETE",
      },
    );

    const result = await deleteResponse.json();

    if (deleteResponse.ok) {
      console.log(`✅ City "${cityToDelete.name}" deleted successfully`);
    } else {
      console.error("❌ Error deleting city:", result);
    }
  } catch (error) {
    console.error("❌ Network error:", error);
  }
}

deleteCity();
