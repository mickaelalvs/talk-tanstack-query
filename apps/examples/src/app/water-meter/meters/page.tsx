"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, TableIcon, Loader2 } from "lucide-react"

export type WaterMeter = {
  id: string
  numero: string
  etage: number
  type: "Résidentiel" | "Commercial" | "Commun"
  proprietaire: string
  consommation: number
  fuiteDetectee: boolean
  dernierReleve: string
  statut: "Actif" | "Inactif" | "Maintenance"
}

type SortField = keyof WaterMeter
type SortDirection = "asc" | "desc"

// API fetch function
const fetchMetersData = async (filters: {
  search: string
  type: string
  etage: string
  fuite: string
  sortField: string
  sortDirection: string
}): Promise<WaterMeter[]> => {
  const params = new URLSearchParams()
  if (filters.search) params.append("search", filters.search)
  if (filters.type && filters.type !== "all") params.append("type", filters.type)
  if (filters.etage && filters.etage !== "all") params.append("etage", filters.etage)
  if (filters.fuite && filters.fuite !== "all") params.append("fuiteDetectee", filters.fuite)
  if (filters.sortField) params.append("sortBy", filters.sortField)
  if (filters.sortDirection) params.append("sortDirection", filters.sortDirection)

  const response = await fetch(`/api/water-meter/meters?${params.toString()}`)
  if (!response.ok) {
    throw new Error("Failed to fetch meters data")
  }
  const data = await response.json()
  return data.meters || []
}

export default function MetersPage() {
  const [searchInput, setSearchInput] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [etageFilter, setEtageFilter] = useState<string>("all")
  const [fuiteFilter, setFuiteFilter] = useState<string>("all")
  const [sortField, setSortField] = useState<SortField>("numero")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  
  // API state
  const [data, setData] = useState<WaterMeter[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(searchInput)
    }, 300) // 300ms debounce

    return () => clearTimeout(timer)
  }, [searchInput])

  // Fetch data when filters change
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const metersData = await fetchMetersData({
          search: searchTerm,
          type: typeFilter,
          etage: etageFilter,
          fuite: fuiteFilter,
          sortField,
          sortDirection
        })
        setData(metersData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data")
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [searchTerm, typeFilter, etageFilter, fuiteFilter, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Data is already filtered and sorted by the API
  const filteredAndSortedData = data

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 px-2 lg:px-3 cursor-pointer justify-start"
      onClick={() => handleSort(field)}
    >
      {children}
      {sortField === field &&
        (sortDirection === "asc" ? <span className="ml-2">↑</span> : <span className="ml-2">↓</span>)}
    </Button>
  )

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md">
            <h2 className="text-lg font-semibold text-destructive mb-2">Erreur de chargement</h2>
            <p className="text-muted-foreground mb-4">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <TableIcon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Compteurs d'Eau</h1>
              <p className="text-muted-foreground mt-1">
                Gestion et surveillance de tous les compteurs d'eau du bâtiment
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="bg-primary/5 p-6 rounded-lg border border-primary/20 mb-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Filtres de recherche
            </h3>
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher par numéro ou propriétaire..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="pl-10"
                    />
              </div>
              <div className="flex flex-wrap gap-3">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[160px] cursor-pointer bg-white border-2">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="cursor-pointer">
                      Tous types
                    </SelectItem>
                    <SelectItem value="Résidentiel" className="cursor-pointer">
                      Résidentiel
                    </SelectItem>
                    <SelectItem value="Commercial" className="cursor-pointer">
                      Commercial
                    </SelectItem>
                    <SelectItem value="Commun" className="cursor-pointer">
                      Commun
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select value={etageFilter} onValueChange={setEtageFilter}>
                  <SelectTrigger className="w-[140px] cursor-pointer bg-white border-2">
                    <SelectValue placeholder="Étage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="cursor-pointer">
                      Tous étages
                    </SelectItem>
                    <SelectItem value="1" className="cursor-pointer">
                      Étage 1
                    </SelectItem>
                    <SelectItem value="2" className="cursor-pointer">
                      Étage 2
                    </SelectItem>
                    <SelectItem value="3" className="cursor-pointer">
                      Étage 3
                    </SelectItem>
                    <SelectItem value="4" className="cursor-pointer">
                      Étage 4
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select value={fuiteFilter} onValueChange={setFuiteFilter}>
                  <SelectTrigger className="w-[140px] cursor-pointer bg-white border-2">
                    <SelectValue placeholder="Fuite" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="cursor-pointer">
                      Toutes
                    </SelectItem>
                    <SelectItem value="oui" className="cursor-pointer">
                      Avec fuite
                    </SelectItem>
                    <SelectItem value="non" className="cursor-pointer">
                      Sans fuite
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="w-full overflow-hidden rounded-md border bg-background">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">
                    <SortButton field="numero">Numéro</SortButton>
                  </TableHead>
                  <TableHead className="w-[80px]">
                    <SortButton field="etage">Étage</SortButton>
                  </TableHead>
                  <TableHead className="w-[120px]">
                    <SortButton field="type">Type</SortButton>
                  </TableHead>
                  <TableHead className="w-[200px]">
                    <SortButton field="proprietaire">Propriétaire</SortButton>
                  </TableHead>
                  <TableHead className="w-[120px] text-right">
                    <SortButton field="consommation">Consommation</SortButton>
                  </TableHead>
                  <TableHead className="w-[100px]">
                    <SortButton field="fuiteDetectee">Fuite</SortButton>
                  </TableHead>
                  <TableHead className="w-[120px]">
                    <SortButton field="dernierReleve">Dernier Relevé</SortButton>
                  </TableHead>
                  <TableHead className="w-[100px]">
                    <SortButton field="statut">Statut</SortButton>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        <span className="text-muted-foreground">Chargement des compteurs...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAndSortedData.map((meter) => (
                    <TableRow key={meter.id}>
                      <TableCell className="font-medium">{meter.numero}</TableCell>
                      <TableCell>{meter.etage}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{meter.type}</Badge>
                      </TableCell>
                      <TableCell>{meter.proprietaire}</TableCell>
                      <TableCell className="text-right">{meter.consommation.toFixed(1)} L</TableCell>
                      <TableCell>
                        {meter.fuiteDetectee ? (
                          <Badge variant="destructive">Détectée</Badge>
                        ) : (
                          <Badge variant="secondary">Aucune</Badge>
                        )}
                      </TableCell>
                      <TableCell>{new Date(meter.dernierReleve).toLocaleDateString("fr-FR")}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            meter.statut === "Actif"
                              ? "default"
                              : meter.statut === "Maintenance"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {meter.statut}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {!isLoading && filteredAndSortedData.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Aucun compteur ne correspond aux critères de recherche.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
