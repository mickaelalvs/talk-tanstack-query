# Database Setup

This project now uses SQLite as the database backend instead of mock data.

## Database Structure

### Tables

1. **cities** - Stores city information
   - `id` (TEXT PRIMARY KEY)
   - `name` (TEXT NOT NULL)
   - `country` (TEXT NOT NULL)
   - `description` (TEXT NOT NULL)
   - `image` (TEXT NOT NULL)
   - `weather_temperature` (INTEGER NOT NULL)
   - `weather_condition` (TEXT NOT NULL)
   - `weather_icon` (TEXT NOT NULL)
   - `attractions` (TEXT NOT NULL) - JSON array as string
   - `best_time_to_visit` (TEXT NOT NULL)

2. **trips** - Stores trip information
   - `id` (TEXT PRIMARY KEY)
   - `name` (TEXT NOT NULL)
   - `created_at` (TEXT NOT NULL)

3. **trip_cities** - Junction table for trips and cities
   - `trip_id` (TEXT NOT NULL)
   - `city_id` (TEXT NOT NULL)
   - `order_index` (INTEGER NOT NULL)
   - PRIMARY KEY (trip_id, city_id)

## Available Scripts

- `npm run db:init` - Initialize the database with sample data
- `npm run db:reset` - Reset the database (delete and recreate)

## API Endpoints

### Cities
- `GET /api/trip-planner/cities` - Get all cities

### Trips
- `GET /api/trip-planner/trips` - Get all trips
- `POST /api/trip-planner/trips` - Create a new trip
- `GET /api/trip-planner/trips/[id]` - Get a specific trip
- `DELETE /api/trip-planner/trips/[id]` - Delete a trip

## Database File Location

The SQLite database file is stored at: `data/trip-planner.db`

## Features

- **WAL Mode**: Database uses Write-Ahead Logging for better performance
- **Automatic Initialization**: Database and tables are created automatically on first use
- **Sample Data**: Initial data is loaded from mock data on first initialization
- **Type Safety**: Full TypeScript support with proper type definitions
- **Error Handling**: Comprehensive error handling in all API routes
