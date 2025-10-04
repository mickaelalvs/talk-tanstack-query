import { NextResponse } from "next/server";
import { cityFromRow, getDatabase, tripFromRow } from "@/lib/database";

export async function GET() {
  try {
    const db = getDatabase();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Get all trips with their cities
    const tripRows = db
      .prepare(`
      SELECT t.*, 
             GROUP_CONCAT(tc.city_id) as city_ids,
             GROUP_CONCAT(tc.order_index) as city_orders
      FROM trips t
      LEFT JOIN trip_cities tc ON t.id = tc.trip_id
      GROUP BY t.id
      ORDER BY t.created_at DESC
    `)
      .all() as { city_ids: string; city_orders: string }[];

    const trips = tripRows.map((tripRow) => {
      const cityIds = tripRow.city_ids ? tripRow.city_ids.split(",") : [];
      const cityOrders = tripRow.city_orders
        ? tripRow.city_orders.split(",").map(Number)
        : [];

      // Get cities for this trip in the correct order
      const cityRows = db
        .prepare(`
        SELECT c.* FROM cities c
        WHERE c.id IN (${cityIds.map(() => "?").join(",")})
        ORDER BY CASE c.id ${cityIds
          .map(
            (id: string, index: number) =>
              `WHEN '${id}' THEN ${cityOrders[index] || index}`,
          )
          .join(" ")} END
      `)
        .all(cityIds);

      const cities = cityRows.map(cityFromRow);

      return tripFromRow(tripRow, cities);
    });

    return NextResponse.json(trips);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch trips" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, cityIds } = await request.json();

    if (!name || !cityIds || !Array.isArray(cityIds) || cityIds.length === 0) {
      return NextResponse.json(
        { error: "Trip name and city IDs are required" },
        { status: 400 },
      );
    }

    const db = getDatabase();
    const tripId = Date.now().toString();
    const createdAt = new Date().toISOString();

    // Insert trip
    db.prepare("INSERT INTO trips (id, name, created_at) VALUES (?, ?, ?)").run(
      tripId,
      name,
      createdAt,
    );

    // Insert trip cities
    const insertTripCity = db.prepare(`
      INSERT INTO trip_cities (trip_id, city_id, order_index) VALUES (?, ?, ?)
    `);

    cityIds.forEach((cityId: string, index: number) => {
      insertTripCity.run(tripId, cityId, index);
    });

    // Get the created trip with cities
    const tripRow = db.prepare("SELECT * FROM trips WHERE id = ?").get(tripId);
    const cityRows = db
      .prepare(`
      SELECT c.* FROM cities c
      INNER JOIN trip_cities tc ON c.id = tc.city_id
      WHERE tc.trip_id = ?
      ORDER BY tc.order_index
    `)
      .all(tripId);

    const cities = cityRows.map(cityFromRow);
    const trip = tripFromRow(tripRow, cities);

    return NextResponse.json(trip, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to create trip" },
      { status: 500 },
    );
  }
}
