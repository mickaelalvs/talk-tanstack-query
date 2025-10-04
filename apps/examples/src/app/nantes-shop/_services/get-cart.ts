import type { Cart } from "@/lib/database";

export const getCart = async (): Promise<Cart> => {
  const response = await fetch(`/api/nantes-shop/cart?userId=default_user`);
  return response.json();
};
