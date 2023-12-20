import { CartReducerStateInterface } from "interfaces";
import { useSelector } from "react-redux";

interface StateRoot {
  cart: CartReducerStateInterface;
}

export const useCartSelector = () =>
  useSelector((state: StateRoot) => state.cart);
