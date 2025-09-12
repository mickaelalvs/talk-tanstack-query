import type { Product } from "../_components/types";

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

export interface ProductsParams {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  showPromotions?: boolean;
  showInStock?: boolean;
  page?: number;
  limit?: number;
}

export async function fetchProducts(
  params: ProductsParams = {},
): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams();

  // Add all parameters to the search params
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value.toString());
    }
  });

  const response = await fetch(
    `/api/nantes-shop/products?${searchParams.toString()}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchProduct(id: number): Promise<Product> {
  const response = await fetch(`/api/nantes-shop/products/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.statusText}`);
  }

  return response.json();
}
