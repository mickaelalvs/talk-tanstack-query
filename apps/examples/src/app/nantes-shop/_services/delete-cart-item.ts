export const deleteCartItem = async (productId: number) => {
  const response = await fetch(
    `/api/nantes-shop/cart/items?userId=default_user&productId=${productId}`,
    {
      method: "DELETE",
    },
  );
  return response.json();
};
