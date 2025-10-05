import { useMutationState } from "@tanstack/react-query";
import {
  Calendar,
  CalendarDays,
  Clock,
  MapPin,
  Plus,
  // Trash2,
  User,
} from "lucide-react";
import { useState } from "react";
import { useDeleteAppointmentMutation } from "@/app/itinerant-healthcare/hooks/useDeleteAppointmentMutation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Appointment } from "@/lib/database";
import { AddAppointmentDialog } from "./AddAppointmentDialog";

interface HomeViewProps {
  setCurrentView: (view: "home" | "calendar") => void;
  isAppointmentsLoading: boolean;
  error: Error | null;
  appointments: Appointment[];
}

export const HomeView = ({
  setCurrentView,
  isAppointmentsLoading,
  error,
  appointments,
}: HomeViewProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] =
    useState<Appointment | null>(null);
  const deleteAppointmentMutation = useDeleteAppointmentMutation();

  const lastMutationState = useMutationState({
    filters: {
      mutationKey: ["createAppointment"],
    },
  });

  const isMutationPending =
    lastMutationState[lastMutationState.length - 1]?.status === "pending";

  const nextAppointment = appointments
    .filter((apt) => new Date(`${apt.date}T${apt.time}`) > new Date())
    .sort(
      (a, b) =>
        new Date(`${a.date}T${a.time}`).getTime() -
        new Date(`${b.date}T${b.time}`).getTime(),
    )[0];

  const handleDeleteAppointment = async () => {
    if (!appointmentToDelete) return;

    try {
      await deleteAppointmentMutation.mutateAsync(appointmentToDelete.id);
      setAppointmentToDelete(null);
    } catch (error) {
      console.error("Failed to delete appointment:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground font-[family-name:var(--font-playfair)]">
              Cabinet du Dr. Errant
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Apporter la guérison dans chaque coin du royaume
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentView("calendar")}
              className="flex items-center gap-2"
            >
              <CalendarDays className="h-4 w-4" />
              Vue Calendrier
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

      <main className="p-6 max-w-6xl mx-auto">
        {isAppointmentsLoading ? (
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
          <>
            {nextAppointment && (
              <Card className="mb-8 border-2 border-primary/20 bg-gradient-to-r from-card to-card/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary font-[family-name:var(--font-playfair)]">
                    <Clock className="h-5 w-5" />
                    Prochain Rendez-vous
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-semibold text-foreground">
                          {nextAppointment.patient}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {nextAppointment.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-semibold text-foreground">
                          {new Date(nextAppointment.date).toLocaleDateString(
                            "fr-FR",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {nextAppointment.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-semibold text-foreground text-balance">
                          {nextAppointment.location}
                        </p>
                        <Badge
                          variant={
                            nextAppointment.status === "confirmed"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {nextAppointment.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="font-[family-name:var(--font-playfair)] text-foreground">
                  Rendez-vous à Venir
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments
                    .filter(
                      (apt) => new Date(`${apt.date}T${apt.time}`) > new Date(),
                    )
                    .sort(
                      (a, b) =>
                        new Date(`${a.date}T${a.time}`).getTime() -
                        new Date(`${b.date}T${b.time}`).getTime(),
                    )
                    .slice(0, 5)
                    .map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col items-center justify-center w-16 h-16 rounded-lg bg-primary/10 text-primary">
                            <span className="text-xs font-medium">
                              {new Date(appointment.date).toLocaleDateString(
                                "fr-FR",
                                { month: "short" },
                              )}
                            </span>
                            <span className="text-lg font-bold">
                              {new Date(appointment.date).getDate()}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <p className="font-semibold text-foreground">
                              {appointment.patient}
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {appointment.time} • {appointment.type}
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span className="text-balance">
                                {appointment.location}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              appointment.status === "confirmed"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {appointment.status}
                          </Badge>
                          {/* <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setAppointmentToDelete(appointment)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button> */}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>

      <AddAppointmentDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!appointmentToDelete}
        onOpenChange={() => setAppointmentToDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer le rendez-vous</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer le rendez-vous de{" "}
              <strong>{appointmentToDelete?.patient}</strong> du{" "}
              {appointmentToDelete?.date} à {appointmentToDelete?.time} ?
              <br />
              Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAppointmentToDelete(null)}
              disabled={deleteAppointmentMutation.isPending}
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAppointment}
              disabled={deleteAppointmentMutation.isPending}
            >
              {deleteAppointmentMutation.isPending
                ? "Suppression..."
                : "Supprimer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
