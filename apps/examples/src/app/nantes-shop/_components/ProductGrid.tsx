import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Pagination } from "./Pagination";
import { ProductCard } from "../cart/ProductCard";
import type { Product } from "./types";

interface ProductGridProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  sortBy: string;
  setSortBy: (sort: string) => void;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export function ProductGrid({
  products,
  currentPage,
  totalPages,
  sortBy,
  setSortBy,
  onPageChange,
  loading = false,
}: ProductGridProps) {
  return (
    <main className="flex-1">
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground">
          {products.length} produit{products.length !== 1 ? "s" : ""} trouvé
          {products.length !== 1 ? "s" : ""}
          {totalPages > 1 && (
            <span className="ml-2">
              (Page {currentPage} sur {totalPages})
            </span>
          )}
        </p>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48 bg-card">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Trier par nom</SelectItem>
            <SelectItem value="price-asc">Prix croissant</SelectItem>
            <SelectItem value="price-desc">Prix décroissant</SelectItem>
            <SelectItem value="rating">Mieux notés</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: nothing better
            <div key={index} className="animate-pulse">
              <div className="bg-muted rounded-lg h-48 mb-4"></div>
              <div className="space-y-2">
                <div className="bg-muted h-4 rounded w-3/4"></div>
                <div className="bg-muted h-3 rounded w-1/2"></div>
                <div className="bg-muted h-6 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />

      {products.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">Aucun produit trouvé</p>
          <p className="text-muted-foreground">
            Essayez de modifier vos critères de recherche
          </p>
        </div>
      )}
    </main>
  );
}
