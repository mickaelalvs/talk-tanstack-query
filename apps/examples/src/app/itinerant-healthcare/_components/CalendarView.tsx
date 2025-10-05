import { useMutationState } from "@tanstack/react-query";
import { Plus, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Appointment } from "@/lib/database";
import { AddAppointmentDialog } from "./AddAppointmentDialog";
import { AppointmentCalendar } from "./AppointmentCalendar";

interface CalendarViewProps {
  setCurrentView: (view: "home" | "calendar") => void;
  isLoading: boolean;
  error: Error | null;
  appointments: Appointment[];
}

export const CalendarView = ({
  setCurrentView,
  isLoading,
  error,
  appointments,
}: CalendarViewProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const lastMutationState = useMutationState({
    filters: {
      mutationKey: ["createAppointment"],
    },
  });

  const isMutationPending =
    lastMutationState[lastMutationState.length - 1]?.status === "pending";

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-playfair)]">
              Calendrier du Dr. Errant
            </h1>
            <p className="text-muted-foreground">
              Gérez vos rendez-vous à travers le royaume
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentView("home")}
              className="flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              Accueil
            </Button>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="flex items-center gap-2"
              disabled={isMutationPending}
            >
              <Plus className="h-4 w-4" />
              {isMutationPending ? "Ajout..." : "Ajouter un Rendez-vous"}
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-muted-foreground">
              Chargement des rendez-vous...
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-destructive">Erreur: {error.message}</div>
          </div>
        ) : (
          <AppointmentCalendar appointments={appointments} />
        )}
      </main>

      <AddAppointmentDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </div>
  );
};
