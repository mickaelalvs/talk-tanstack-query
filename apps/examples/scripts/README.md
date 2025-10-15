# Database Scripts

This directory contains utility scripts for managing the trip planner database.

## Available Scripts

### Database Initialization
- `npm run db:init` - Initialize the database with initial data (cities, trips, appointments)
- `npm run db:reset` - Reset the entire database (delete and recreate)

### Data Population
- `npm run db:populate-products` - Populate the database with product data for the Nantes shop

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

## Script Details

### `clear-trips.ts`
Simple script that removes all trips and their associated city relationships from the database.

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
