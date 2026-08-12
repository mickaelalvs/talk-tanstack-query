import { Search } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Cart } from "../cart/Cart";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function Header({ searchTerm, setSearchTerm }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-primary">
            Spécialités de Bordeaux
          </h1>
          <Cart />
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Rechercher des produits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background"
          />
        </div>
      </div>
    </header>
  );
}
