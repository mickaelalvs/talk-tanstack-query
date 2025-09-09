import Database from 'better-sqlite3';
import path from 'path';
import { City, Trip } from './mock-data';

// Database file path
const dbPath = path.join(process.cwd(), 'data', 'trip-planner.db');

// Create database instance
let db: Database.Database | null = null;

export function getDatabase(): Database.Database {
  if (!db) {
    // Ensure the data directory exists
    const fs = require('fs');
    const dataDir = path.dirname(dbPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
    initializeTables();
  }
  return db;
}

function initializeTables() {
  if (!db) return;

  // Create cities table
  db.exec(`
    CREATE TABLE IF NOT EXISTS cities (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      country TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      weather_temperature INTEGER NOT NULL,
      weather_condition TEXT NOT NULL,
      weather_icon TEXT NOT NULL,
      attractions TEXT NOT NULL, -- JSON array as string
      best_time_to_visit TEXT NOT NULL
    )
  `);

  // Create trips table
  db.exec(`
    CREATE TABLE IF NOT EXISTS trips (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `);

  // Create trip_cities junction table
  db.exec(`
    CREATE TABLE IF NOT EXISTS trip_cities (
      trip_id TEXT NOT NULL,
      city_id TEXT NOT NULL,
      order_index INTEGER NOT NULL,
      PRIMARY KEY (trip_id, city_id),
      FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
      FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE
    )
  `);

  // Insert initial data if tables are empty
  const cityCount = db.prepare('SELECT COUNT(*) as count FROM cities').get() as { count: number };
  if (cityCount.count === 0) {
    insertInitialData();
  }
}

function insertInitialData() {
  if (!db) return;

  const { mockCities, mockTrips } = require('./mock-data');

  // Insert cities
  const insertCity = db.prepare(`
    INSERT INTO cities (
      id, name, country, description, image,
      weather_temperature, weather_condition, weather_icon,
      attractions, best_time_to_visit
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const city of mockCities) {
    insertCity.run(
      city.id,
      city.name,
      city.country,
      city.description,
      city.image,
      city.weather.temperature,
      city.weather.condition,
      city.weather.icon,
      JSON.stringify(city.attractions),
      city.bestTimeToVisit
    );
  }

  // Insert trips
  const insertTrip = db.prepare(`
    INSERT INTO trips (id, name, created_at) VALUES (?, ?, ?)
  `);

  const insertTripCity = db.prepare(`
    INSERT INTO trip_cities (trip_id, city_id, order_index) VALUES (?, ?, ?)
  `);

  for (const trip of mockTrips) {
    insertTrip.run(trip.id, trip.name, trip.createdAt.toISOString());
    
    // Insert trip cities
    trip.cities.forEach((city, index) => {
      insertTripCity.run(trip.id, city.id, index);
    });
  }
}

// Helper functions for data conversion
export function cityFromRow(row: any): City {
  return {
    id: row.id,
    name: row.name,
    country: row.country,
    description: row.description,
    image: row.image,
    weather: {
      temperature: row.weather_temperature,
      condition: row.weather_condition,
      icon: row.weather_icon,
    },
    attractions: JSON.parse(row.attractions),
    bestTimeToVisit: row.best_time_to_visit,
  };
}

export function tripFromRow(row: any, cities: City[]): Trip {
  return {
    id: row.id,
    name: row.name,
    cities,
    createdAt: new Date(row.created_at),
  };
}

// Close database connection (useful for cleanup)
export function closeDatabase() {
  if (db) {
    db.close();
    db = null;
  }
}
