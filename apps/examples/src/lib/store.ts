import { configureStore } from "@reduxjs/toolkit";
import { atom } from "jotai";
import cartReducer from "../app/nantes-shop/_stores/cartSlice";
import { optimisticCartMiddleware } from "../app/nantes-shop/_middleware/optimisticCartMiddleware";
import type { City } from "./mock-data";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(optimisticCartMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Jotai atoms for trip planner
export const selectedCitiesAtom = atom<City[]>([]);

// Derived atom for selected cities count
export const selectedCitiesCountAtom = atom(
  (get) => get(selectedCitiesAtom).length,
);

// Actions for selected cities
export const addCityToSelectionAtom = atom(null, (get, set, city: City) => {
  const currentCities = get(selectedCitiesAtom);
  if (!currentCities.find((c) => c.id === city.id)) {
    set(selectedCitiesAtom, [...currentCities, city]);
  }
});

export const removeCityFromSelectionAtom = atom(
  null,
  (get, set, cityId: string) => {
    const currentCities = get(selectedCitiesAtom);
    set(
      selectedCitiesAtom,
      currentCities.filter((c) => c.id !== cityId),
    );
  },
);

export const clearSelectedCitiesAtom = atom(null, (_, set) => {
  set(selectedCitiesAtom, []);
});
