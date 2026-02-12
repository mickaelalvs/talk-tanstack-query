import { NextResponse } from "next/server";
import { cityFromRow, getDatabase } from "../../../../../lib/database";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const db = getDatabase();
    const cityId = params.id;

    const cityRow = db.prepare("SELECT * FROM cities WHERE id = ?").get(cityId);

    if (!cityRow) {
      return NextResponse.json({ error: "City not found" }, { status: 404 });
    }

    const city = cityFromRow(cityRow);

    return NextResponse.json(city);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch city" },
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
    const cityId = params.id;

    // Check if city exists
    const cityRow = db.prepare("SELECT * FROM cities WHERE id = ?").get(cityId);

    if (!cityRow) {
      return NextResponse.json({ error: "City not found" }, { status: 404 });
    }

    // Delete city
    db.prepare("DELETE FROM cities WHERE id = ?").run(cityId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to delete city" },
      { status: 500 },
    );
  }
}
