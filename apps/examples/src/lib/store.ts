import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../app/nantes-shop/_stores/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
