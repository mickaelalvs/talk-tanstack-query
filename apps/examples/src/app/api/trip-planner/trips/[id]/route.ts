import { NextResponse } from "next/server";
import { cityFromRow, getDatabase, tripFromRow } from "@/lib/database";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const db = getDatabase();
    const tripId = params.id;

    // Get trip
    const tripRow = db.prepare("SELECT * FROM trips WHERE id = ?").get(tripId);

    if (!tripRow) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    // Get cities for this trip
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

    return NextResponse.json(trip);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch trip" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const db = getDatabase();
    const tripId = params.id;

    // Check if trip exists
    const tripRow = db.prepare("SELECT * FROM trips WHERE id = ?").get(tripId);

    if (!tripRow) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    // Delete trip (cascade will handle trip_cities)
    db.prepare("DELETE FROM trips WHERE id = ?").run(tripId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to delete trip" },
      { status: 500 },
    );
  }
}
