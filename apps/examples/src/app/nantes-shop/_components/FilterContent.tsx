import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Checkbox } from "../../../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Slider } from "../../../components/ui/slider";

interface FiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  showPromotions: boolean;
  setShowPromotions: (show: boolean) => void;
  showInStock: boolean;
  setShowInStock: (show: boolean) => void;
  clearAllFilters: () => void;
  categories: string[];
}

export function Filters({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  showPromotions,
  setShowPromotions,
  showInStock,
  setShowInStock,
  clearAllFilters,
  categories,
}: FiltersProps) {
  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-24">
        <Card className="bg-card">
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-card-foreground">Filtres</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-muted-foreground"
                >
                  Effacer tout
                </Button>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-foreground">
                  Catégorie
                </h3>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="bg-card">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-foreground">Prix (€)</h3>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={75000000}
                    min={0}
                    step={100000}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>
                      {priceRange[0] >= 1000000
                        ? `${(priceRange[0] / 1000000).toFixed(1)}M€`
                        : `${priceRange[0]}€`}
                    </span>
                    <span>
                      {priceRange[1] >= 1000000
                        ? `${(priceRange[1] / 1000000).toFixed(1)}M€`
                        : `${priceRange[1]}€`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Filtres</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="promotions"
                    checked={showPromotions}
                    onCheckedChange={setShowPromotions}
                  />
                  <label
                    htmlFor="promotions"
                    className="text-sm text-foreground"
                  >
                    Promotions uniquement
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="instock"
                    checked={showInStock}
                    onCheckedChange={setShowInStock}
                  />
                  <label htmlFor="instock" className="text-sm text-foreground">
                    En stock uniquement
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
