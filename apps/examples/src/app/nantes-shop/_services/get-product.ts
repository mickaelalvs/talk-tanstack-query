import type { Product } from "../_components/types";

export const getProduct = async (id: number): Promise<Product> => {
  const response = await fetch(`/api/nantes-shop/products/${id}`);
  return response.json();
};
