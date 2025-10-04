import type { Product } from "../_components/types";

export interface ProductsParams {
  search?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export interface ProductsResponse {
  products: Product[];
  categories: string[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  filters: {
    search: string;
    category: string;
    minPrice: number;
    maxPrice: number;
    sortBy: string;
    showPromotions: boolean;
    showInStock: boolean;
  };
}

export const listProducts = async (
  params: ProductsParams,
): Promise<ProductsResponse> => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value.toString());
    }
  });

  const response = await fetch(
    `/api/nantes-shop/products?${searchParams.toString()}`,
  );

  return response.json();
};
