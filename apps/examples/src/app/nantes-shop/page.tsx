"use client";

import { useState } from "react";
import { ErrorPage } from "./_components/ErrorPage";
import { Header } from "./_components/Header";
import { ProductGrid } from "./_components/ProductGrid";
import { useListProductsQuery } from "./_hooks/queries/useListProductsQuery";

export default function NantesShoppingApp() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const {
    data: productsData,
    isPending,
    error,
  } = useListProductsQuery({
    search: searchTerm,
    sortBy,
    page: currentPage,
    limit: itemsPerPage,
  });

  const paginatedProducts = productsData?.products || [];
  const totalPages = productsData?.pagination?.totalPages || 0;

  if (error) {
    return <ErrorPage error={error.message} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <ProductGrid
            products={paginatedProducts}
            currentPage={currentPage}
            totalPages={totalPages}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onPageChange={setCurrentPage}
            loading={isPending}
          />
        </div>
      </div>
    </div>
  );
}
