export interface UpdateCartParams {
  userId?: string;
  productId: number;
  quantity: number;
}

export const updateCart = async ({
  userId = "default_user",
  productId,
  quantity,
}: UpdateCartParams) => {
  const response = await fetch(`/api/nantes-shop/cart/items`, {
    method: "PUT",
    body: JSON.stringify({ userId, productId, quantity }),
  });

  return response.json();
};
