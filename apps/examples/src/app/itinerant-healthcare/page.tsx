"use client";

import { useState } from "react";
import { CalendarView } from "./_components/CalendarView";
import { HomeView } from "./_components/HomeView";
import { useAppointmentQuery } from "./_hooks/useAppointmentQuery";

export default function HomePage() {
  const [currentView, setCurrentView] = useState<"home" | "calendar">("home");

  const { data: appointments = [], isPending, error } = useAppointmentQuery();

  if (currentView === "calendar") {
    return (
      <CalendarView
        setCurrentView={setCurrentView}
        isLoading={isPending}
        error={error}
        appointments={appointments}
      />
    );
  }

  return (
    <HomeView
      setCurrentView={setCurrentView}
      isAppointmentsLoading={isPending}
      error={error}
      appointments={appointments}
    />
  );
}
