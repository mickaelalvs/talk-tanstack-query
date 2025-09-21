"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, User, Plus, CalendarDays } from "lucide-react"
import { AppointmentCalendar } from "./_components/appointment-calendar"
import { AddAppointmentDialog } from "./_components/add-appointment-dialog"

// Fairy tale themed mock data
const mockAppointments = [
  {
    id: "1",
    patient: "Little Red Riding Hood",
    location: "Grandmother's Cottage, Enchanted Forest",
    date: "2024-01-20",
    time: "09:00",
    type: "Check-up",
    status: "confirmed" as const,
  },
  {
    id: "2",
    patient: "Goldilocks",
    location: "Three Bears House, Deep Woods",
    date: "2024-01-20",
    time: "14:30",
    type: "Emergency",
    status: "confirmed" as const,
  },
  {
    id: "3",
    patient: "Cinderella",
    location: "Royal Palace, Kingdom Square",
    date: "2024-01-21",
    time: "10:00",
    type: "Follow-up",
    status: "pending" as const,
  },
  {
    id: "4",
    patient: "Snow White",
    location: "Seven Dwarfs Cottage, Mountain Pass",
    date: "2024-01-22",
    time: "11:00",
    type: "Consultation",
    status: "confirmed" as const,
  },
]

export default function HomePage() {
  const [currentView, setCurrentView] = useState<"home" | "calendar">("home")
  const [appointments, setAppointments] = useState(mockAppointments)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Get next appointment
  const nextAppointment = appointments
    .filter((apt) => new Date(`${apt.date}T${apt.time}`) > new Date())
    .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime())[0]

  const handleAddAppointment = (newAppointment: any) => {
    const appointment = {
      ...newAppointment,
      id: Date.now().toString(),
      status: "confirmed" as const,
    }
    setAppointments([...appointments, appointment])
  }

  if (currentView === "calendar") {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-playfair)]">
                {"Dr. Wanderer's Calendar"}
              </h1>
              <p className="text-muted-foreground">Manage your appointments across the realm</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setCurrentView("home")} className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Home
              </Button>
              <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Appointment
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6">
          <AppointmentCalendar appointments={appointments} />
        </main>

        <AddAppointmentDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onAddAppointment={handleAddAppointment}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground font-[family-name:var(--font-playfair)]">
              {"Dr. Wanderer's Practice"}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Bringing healing to every corner of the realm
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setCurrentView("calendar")} className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Calendar View
            </Button>
            <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Appointment
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-6xl mx-auto">
        {/* Next Appointment Card */}
        {nextAppointment && (
          <Card className="mb-8 border-2 border-primary/20 bg-gradient-to-r from-card to-card/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary font-[family-name:var(--font-playfair)]">
                <Clock className="h-5 w-5" />
                Next Appointment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">{nextAppointment.patient}</p>
                    <p className="text-sm text-muted-foreground">{nextAppointment.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">
                      {new Date(nextAppointment.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-sm text-muted-foreground">{nextAppointment.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground text-balance">{nextAppointment.location}</p>
                    <Badge variant={nextAppointment.status === "confirmed" ? "default" : "secondary"}>
                      {nextAppointment.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="font-[family-name:var(--font-playfair)] text-foreground">
              Upcoming Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments
                .filter((apt) => new Date(`${apt.date}T${apt.time}`) > new Date())
                .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime())
                .slice(0, 5)
                .map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center justify-center w-16 h-16 rounded-lg bg-primary/10 text-primary">
                        <span className="text-xs font-medium">
                          {new Date(appointment.date).toLocaleDateString("en-US", { month: "short" })}
                        </span>
                        <span className="text-lg font-bold">{new Date(appointment.date).getDate()}</span>
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold text-foreground">{appointment.patient}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {appointment.time} • {appointment.type}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span className="text-balance">{appointment.location}</span>
                        </p>
                      </div>
                    </div>
                    <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                      {appointment.status}
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <AddAppointmentDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddAppointment={handleAddAppointment}
      />
    </div>
  )
}
