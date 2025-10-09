import { useQueryClient } from "@tanstack/react-query";
import { Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

export const GraphFilters = ({
  selectedPeriod,
  setSelectedPeriod,
}: {
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
}) => {
  const queryClient = useQueryClient();

  const setSelectedPeriodAndClearCache = (period: string) => {
    setSelectedPeriod(period);
    queryClient.removeQueries({ queryKey: ["water-data"] });
  };

  return (
    <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">
          Filtres temporels
        </h3>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label
            htmlFor="period-select"
            className="text-sm font-medium mb-2 block"
          >
            Période d'analyse
          </label>
          <Select
            value={selectedPeriod}
            onValueChange={setSelectedPeriodAndClearCache}
          >
            <SelectTrigger
              id="period-select"
              className="cursor-pointer bg-white border-2"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today" className="cursor-pointer">
                Aujourd'hui
              </SelectItem>
              <SelectItem value="week" className="cursor-pointer">
                Cette semaine
              </SelectItem>
              <SelectItem value="month" className="cursor-pointer">
                Ce mois
              </SelectItem>
              <SelectItem value="semester" className="cursor-pointer">
                Ce semestre
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
