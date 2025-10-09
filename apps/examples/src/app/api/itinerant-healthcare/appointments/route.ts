import { NextResponse } from "next/server";
import {
  type CreateAppointmentRequest,
  createAppointment,
  deleteAppointment,
  getAllAppointments,
} from "../../../../lib/database";

export async function GET() {
  try {
    // Simulate a small delay to mimic real API behavior
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const appointments = getAllAppointments();

    return NextResponse.json({
      success: true,
      data: appointments,
    });
  } catch (_error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch appointments",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const body: CreateAppointmentRequest = await request.json();
    const { patient, location, date, time, type, notes } = body;

    // Validate required fields
    if (!patient || !location || !date || !time || !type) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 },
      );
    }

    // Create new appointment in database
    const newAppointment = createAppointment({
      patient,
      location,
      date,
      time,
      type,
      notes,
    });

    return NextResponse.json({
      success: true,
      data: newAppointment,
    });
  } catch (_error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create appointment",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing appointment ID",
        },
        { status: 400 },
      );
    }

    const deleted = deleteAppointment(id);

    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          error: "Appointment not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (_error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete appointment",
      },
      { status: 500 },
    );
  }
}
