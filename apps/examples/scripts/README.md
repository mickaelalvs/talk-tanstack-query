# Database Scripts

This directory contains utility scripts for managing the trip planner database.

## Available Scripts

### Database Initialization
- `npm run db:init` - Initialize the database with initial data (cities, trips, appointments)
- `npm run db:reset` - Reset the entire database (delete and recreate)

### Data Population
- `npm run db:populate-products` - Populate the database with product data for the Nantes shop

### Data Export
- `npm run db:export` - Export the database in various formats (JSON, SQL, CSV)

### Data Clearing
- `npm run db:clear-trips` - Clear all trips and trip-city relationships
- `npm run db:clear` - Clear specific data types (defaults to trips)
- `npm run db:clear-all` - Clear all data from the database

## Usage Examples

### Clear only trips
```bash
npm run db:clear-trips
```

### Clear specific data types
```bash
# Clear only trips
npm run db:clear -- --trips

# Clear only appointments
npm run db:clear -- --appointments

# Clear only cart data
npm run db:clear -- --cart

# Clear multiple types
npm run db:clear -- --trips --appointments
```

### Clear everything
```bash
npm run db:clear-all
```

### Export database
```bash
# Export as JSON (default)
npm run db:export

# Export as SQL
npm run db:export -- --format sql

# Export all formats (JSON, SQL, CSV)
npm run db:export -- --format all

# Export specific tables only
npm run db:export -- --tables cities,trips

# Export to custom directory
npm run db:export -- --output backup

# Export schema only (no data)
npm run db:export -- --no-data

# Export data only (no schema)
npm run db:export -- --no-schema
```

## Script Details

### `clear-trips.ts`
Simple script that removes all trips and their associated city relationships from the database.

### `export-db.ts`
Comprehensive database export script that supports multiple formats:
- **JSON**: Complete database export with metadata, schema, and data
- **SQL**: SQLite-compatible SQL dump with schema and data
- **CSV**: Individual CSV files for each table
- **Flexible options**: Choose specific tables, output directory, data/schema only

### `clear-data.ts`
Comprehensive script that can clear different types of data:
- **Trips**: All trips and trip-city relationships
- **Appointments**: All medical appointments
- **Products**: All products from the Nantes shop
- **Cart**: All cart data and cart items

## Database Schema

The database contains the following tables:
- `cities` - City information (read-only, populated from mock data)
- `trips` - User-created trips
- `trip_cities` - Junction table linking trips to cities
- `products` - Products for the Nantes shop
- `cart` - Shopping carts
- `cart_items` - Items in shopping carts
- `appointments` - Medical appointments

## Safety Notes

- These scripts permanently delete data from the database
- Always backup your data before running clear scripts
- The `cities` table is not affected by clear scripts (it's read-only)
- Foreign key constraints ensure data integrity during deletion
