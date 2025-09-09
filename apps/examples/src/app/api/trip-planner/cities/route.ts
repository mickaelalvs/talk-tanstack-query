import { NextResponse } from "next/server";
import { getDatabase, cityFromRow } from "@/lib/database";
import { City } from "@/lib/mock-data";

export async function GET() {
  try {
    const db = getDatabase();
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    const rows = db.prepare('SELECT * FROM cities ORDER BY name').all();
    const cities = rows.map(cityFromRow);
    
    return NextResponse.json(cities);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cities' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'country', 'description', 'image', 'weather', 'attractions', 'bestTimeToVisit'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate weather object
    if (!body.weather.temperature || !body.weather.condition || !body.weather.icon) {
      return NextResponse.json(
        { error: 'Invalid weather data. Required: temperature, condition, icon' },
        { status: 400 }
      );
    }

    // Validate attractions array
    if (!Array.isArray(body.attractions) || body.attractions.length === 0) {
      return NextResponse.json(
        { error: 'Attractions must be a non-empty array' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    
    // Generate unique ID
    const id = `city_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Insert new city
    const insertCity = db.prepare(`
      INSERT INTO cities (
        id, name, country, description, image,
        weather_temperature, weather_condition, weather_icon,
        attractions, best_time_to_visit
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertCity.run(
      id,
      body.name,
      body.country,
      body.description,
      body.image,
      body.weather.temperature,
      body.weather.condition,
      body.weather.icon,
      JSON.stringify(body.attractions),
      body.bestTimeToVisit
    );

    // Fetch the created city to return it
    const createdCity = db.prepare('SELECT * FROM cities WHERE id = ?').get(id);
    const city = cityFromRow(createdCity);

    return NextResponse.json(city, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to create city' },
      { status: 500 }
    );
  }
}
