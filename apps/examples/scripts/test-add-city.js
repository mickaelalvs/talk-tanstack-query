// Test script to add a new city
// Run with: node test-add-city.js

const testCity = {
  name: "Rome",
  country: "Italy",
  description: "The Eternal City, known for its ancient history, art, and architecture.",
  image: "/rome-colosseum-roman-forum.png",
  weather: {
    temperature: 25,
    condition: "Ensoleillé",
    icon: "☀️"
  },
  attractions: [
    "Colisée",
    "Forum Romain",
    "Fontaine de Trevi",
    "Vatican"
  ],
  bestTimeToVisit: "Avril à juin, septembre à octobre"
};

async function addCity() {
  try {
    const response = await fetch('http://localhost:3000/api/trip-planner/cities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testCity)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ City added successfully:', result);
    } else {
      console.error('❌ Error adding city:', result);
    }
  } catch (error) {
    console.error('❌ Network error:', error);
  }
}

addCity();
