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
  "Le Petit Chaperon Rouge",
  "Boucle d'Or",
  "Cendrillon",
  "Blanche-Neige",
  "La Belle au Bois Dormant",
  "Raiponce",
  "Hansel",
  "Gretel",
  "Jack (Haricot Magique)",
  "Les Trois Petits Cochons",
  "Rumpelstiltskin",
  "Le Bonhomme de Pain d'Épice",
]

const fairyTaleLocations = [
  "Cottage de Grand-mère, Forêt Enchantée",
  "Maison des Trois Ours, Bois Profond",
  "Palais Royal, Place du Royaume",
  "Cottage des Sept Nains, Col de Montagne",
  "Tour dans les Nuages, Royaume Céleste",
  "Cabane de la Sorcière, Forêt Sombre",
  "Maison en Pain d'Épice, Allée des Bonbons",
  "Château sur la Colline, Quartier Royal",
  "Cabane du Bûcheron, Bosquet de Pins",
  "Place du Village, Ville des Contes",
  "Ferme des Haricots Magiques, Vallée des Géants",
  "Tour du Rouet, Royaume des Fées",
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
            Planifier un Nouveau Rendez-vous
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="patient" className="text-sm font-medium">
              Nom du Patient
            </Label>
            <Select value={formData.patient} onValueChange={(value) => handleInputChange("patient", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un patient" />
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
              Lieu
            </Label>
            <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un lieu" />
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
                Heure
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
              Type de Rendez-vous
            </Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner le type de rendez-vous" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Contrôle">Contrôle</SelectItem>
                <SelectItem value="Consultation">Consultation</SelectItem>
                <SelectItem value="Suivi">Suivi</SelectItem>
                <SelectItem value="Urgence">Urgence</SelectItem>
                <SelectItem value="Vaccination">Vaccination</SelectItem>
                <SelectItem value="Traitement">Traitement</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium">
              Notes (Optionnel)
            </Label>
            <Textarea
              id="notes"
              placeholder="Notes supplémentaires sur le rendez-vous..."
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">Planifier le Rendez-vous</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
