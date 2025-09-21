"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface AddAppointmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddAppointment: (appointment: any) => void
}

const fairyTalePatients = [
  "Little Red Riding Hood",
  "Goldilocks",
  "Cinderella",
  "Snow White",
  "Sleeping Beauty",
  "Rapunzel",
  "Hansel",
  "Gretel",
  "Jack (Beanstalk)",
  "Three Little Pigs",
  "Rumpelstiltskin",
  "The Gingerbread Man",
]

const fairyTaleLocations = [
  "Grandmother's Cottage, Enchanted Forest",
  "Three Bears House, Deep Woods",
  "Royal Palace, Kingdom Square",
  "Seven Dwarfs Cottage, Mountain Pass",
  "Tower in the Clouds, Sky Kingdom",
  "Witch's Hut, Dark Forest",
  "Gingerbread House, Candy Lane",
  "Castle on the Hill, Royal District",
  "Woodcutter's Cabin, Pine Grove",
  "Village Square, Storybook Town",
  "Magic Bean Farm, Giant's Valley",
  "Spinning Wheel Tower, Fairy Realm",
]

export function AddAppointmentDialog({ open, onOpenChange, onAddAppointment }: AddAppointmentDialogProps) {
  const [formData, setFormData] = useState({
    patient: "",
    location: "",
    date: "",
    time: "",
    type: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.patient && formData.location && formData.date && formData.time && formData.type) {
      onAddAppointment(formData)
      setFormData({
        patient: "",
        location: "",
        date: "",
        time: "",
        type: "",
        notes: "",
      })
      onOpenChange(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-[family-name:var(--font-playfair)] text-xl">
            Schedule New Appointment
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="patient" className="text-sm font-medium">
              Patient Name
            </Label>
            <Select value={formData.patient} onValueChange={(value) => handleInputChange("patient", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a patient" />
              </SelectTrigger>
              <SelectContent>
                {fairyTalePatients.map((patient) => (
                  <SelectItem key={patient} value={patient}>
                    {patient}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium">
              Location
            </Label>
            <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a location" />
              </SelectTrigger>
              <SelectContent>
                {fairyTaleLocations.map((location) => (
                  <SelectItem key={location} value={location}>
                    <span className="text-balance">{location}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm font-medium">
                Time
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-sm font-medium">
              Appointment Type
            </Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select appointment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Check-up">Check-up</SelectItem>
                <SelectItem value="Consultation">Consultation</SelectItem>
                <SelectItem value="Follow-up">Follow-up</SelectItem>
                <SelectItem value="Emergency">Emergency</SelectItem>
                <SelectItem value="Vaccination">Vaccination</SelectItem>
                <SelectItem value="Treatment">Treatment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium">
              Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              placeholder="Additional notes about the appointment..."
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Schedule Appointment</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
