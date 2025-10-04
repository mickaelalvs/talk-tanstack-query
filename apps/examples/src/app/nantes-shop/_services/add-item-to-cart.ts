export const addItemToCart = async ({
  productId,
  quantity,
}: {
  productId: number;
  quantity: number;
}) => {
  const response = await fetch(`/api/nantes-shop/cart/items`, {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });
  return response.json();
};
