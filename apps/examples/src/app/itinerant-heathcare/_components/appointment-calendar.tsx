"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react"

interface Appointment {
  id: string
  patient: string
  location: string
  date: string
  time: string
  type: string
  status: "confirmed" | "pending"
}

interface AppointmentCalendarProps {
  appointments: Appointment[]
}

export function AppointmentCalendar({ appointments }: AppointmentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ]

  const daysOfWeek = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const getAppointmentsForDate = (day: number | null) => {
    if (!day) return []

    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return appointments.filter((apt) => apt.date === dateStr)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const days = getDaysInMonth(currentDate)

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-[family-name:var(--font-playfair)] text-2xl">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth("prev")}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Précédent
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth("next")}
                className="flex items-center gap-1"
              >
                Suivant
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {daysOfWeek.map((day) => (
              <div key={day} className="p-2 text-center font-semibold text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              const dayAppointments = getAppointmentsForDate(day)
              const isToday =
                day &&
                new Date().getDate() === day &&
                new Date().getMonth() === currentDate.getMonth() &&
                new Date().getFullYear() === currentDate.getFullYear()

              return (
                <div
                  key={index}
                  className={`min-h-[120px] p-2 border border-border rounded-lg ${
                    day ? "bg-card hover:bg-muted/30 transition-colors" : "bg-muted/20"
                  } ${isToday ? "ring-2 ring-primary ring-offset-2" : ""}`}
                >
                  {day && (
                    <>
                      <div className={`text-sm font-semibold mb-2 ${isToday ? "text-primary" : "text-foreground"}`}>
                        {day}
                      </div>
                      <div className="space-y-1">
                        {dayAppointments.map((apt) => (
                          <div
                            key={apt.id}
                            className={`text-xs p-1 rounded text-balance leading-tight ${
                              apt.status === "confirmed"
                                ? "bg-primary/10 text-primary border border-primary/20"
                                : "bg-secondary/10 text-secondary-foreground border border-secondary/20"
                            }`}
                          >
                            <div className="font-medium">{apt.time}</div>
                            <div className="truncate">{apt.patient}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Appointments List for Selected Month */}
      <Card>
        <CardHeader>
          <CardTitle className="font-[family-name:var(--font-playfair)]">Rendez-vous ce Mois</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments
              .filter((apt) => {
                const aptDate = new Date(apt.date)
                return (
                  aptDate.getMonth() === currentDate.getMonth() && aptDate.getFullYear() === currentDate.getFullYear()
                )
              })
              .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime())
              .map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center justify-center w-16 h-16 rounded-lg bg-primary/10 text-primary">
                      <span className="text-xs font-medium">
                        {new Date(appointment.date).toLocaleDateString("fr-FR", { month: "short" })}
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
    </div>
  )
}
