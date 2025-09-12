"use client";

import { useEffect, useState } from "react";
import { Header, ProductGrid } from "./_components";
import { ErrorPage } from "./_components/ErrorPage";
import { Filters } from "./_components/FilterContent";
import {
  fetchProducts,
  type ProductsParams,
  type ProductsResponse,
} from "./_services/api";

export default function NantesShoppingApp() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [priceRange, setPriceRange] = useState<number[]>([0, 75000000]);
  const [sortBy, setSortBy] = useState("name");
  const [showPromotions, setShowPromotions] = useState(false);
  const [showInStock, setShowInStock] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const [productsData, setProductsData] = useState<ProductsResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const params: ProductsParams = {
          search: searchTerm,
          category: selectedCategory,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          sortBy,
          showPromotions,
          showInStock,
          page: currentPage,
          limit: itemsPerPage,
        };

        const data = await fetchProducts(params);
        setProductsData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load products",
        );
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [
    searchTerm,
    selectedCategory,
    priceRange,
    sortBy,
    showPromotions,
    showInStock,
    currentPage,
    itemsPerPage,
  ]);

  const paginatedProducts = productsData?.products || [];
  const totalPages = productsData?.pagination.totalPages || 0;

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("Tous");
    setPriceRange([0, 75000000]);
    setShowPromotions(false);
    setShowInStock(false);
    setCurrentPage(1);
  };

  if (error) {
    <ErrorPage error={error} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <Filters
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            showPromotions={showPromotions}
            setShowPromotions={setShowPromotions}
            showInStock={showInStock}
            setShowInStock={setShowInStock}
            clearAllFilters={clearAllFilters}
            categories={productsData?.categories || []}
          />
          <ProductGrid
            products={paginatedProducts}
            currentPage={currentPage}
            totalPages={totalPages}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onPageChange={setCurrentPage}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
