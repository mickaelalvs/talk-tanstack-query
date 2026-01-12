// Script to delete a city by name
// Run with: node remove-city.js <city-name>
// Example: node remove-city.js Grenoble

const cityName = process.argv[2];

if (!cityName) {
  console.error("❌ Error: City name is required");
  console.log("Usage: node remove-city.js <city-name>");
  console.log("Example: node remove-city.js Grenoble");
  process.exit(1);
}

async function removeCity() {
  try {
    const response = await fetch(
      `http://localhost:1234/api/trip-planner/cities?name=${encodeURIComponent(cityName)}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const result = await response.json();

    if (response.ok) {
      console.log(`✅ City "${cityName}" deleted successfully:`, result);
    } else {
      console.error(`❌ Error deleting city "${cityName}":`, result.error || result);
    }
  } catch (error) {
    console.error("❌ Network error:", error);
  }
}

removeCity();
