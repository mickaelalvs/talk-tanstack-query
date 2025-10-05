import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMetersFilters } from "../../_hooks/useMetersFilters";

export const MetersFilters = () => {
  const {
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    floorFilter,
    setFloorFilter,
    leakFilter,
    setLeakFilter,
  } = useMetersFilters();

  return (
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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

          <Select value={floorFilter} onValueChange={setFloorFilter}>
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

          <Select value={leakFilter} onValueChange={setLeakFilter}>
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
  );
};
