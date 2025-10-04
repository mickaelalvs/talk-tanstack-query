import { useAtom } from "jotai";
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import type { AppDispatch, RootState } from "./store";
import {
  addCityToSelectionAtom,
  clearSelectedCitiesAtom,
  removeCityFromSelectionAtom,
  selectedCitiesAtom,
} from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useCitySelection = () => {
  const [selectedCities] = useAtom(selectedCitiesAtom);
  const [, addCityToSelection] = useAtom(addCityToSelectionAtom);
  const [, removeCityFromSelection] = useAtom(removeCityFromSelectionAtom);
  const [, clearSelectedCities] = useAtom(clearSelectedCitiesAtom);

  return {
    selectedCities,
    addCityToSelection,
    removeCityFromSelection,
    clearSelectedCities,
    hasSelectedCities: selectedCities.length > 0,
    selectedCitiesCount: selectedCities.length,
  };
};
