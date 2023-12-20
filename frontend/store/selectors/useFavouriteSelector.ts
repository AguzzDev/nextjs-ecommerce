import { FavouriteReducerStateInterface } from "interfaces";
import { useSelector } from "react-redux";

interface StateRoot {
  favourite: FavouriteReducerStateInterface;
}

export const useFavouriteSelector = () =>
  useSelector((state: StateRoot) => state.favourite);
