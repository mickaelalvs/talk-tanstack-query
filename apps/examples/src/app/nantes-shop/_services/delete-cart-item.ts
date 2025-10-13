export const deleteCartItem = async (productId: number) => {
  const response = await fetch(`/api/nantes-shop/cart/items`, {
    method: "PUT",
    body: JSON.stringify({ userId: "default_user", productId, quantity: 0 }),
  });
  return response.json();
};
