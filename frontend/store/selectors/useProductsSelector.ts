import { ProductReducerStateInterface } from "interfaces";
import { useSelector } from "react-redux";

interface StateRoot {
  products: ProductReducerStateInterface;
}

export const useProductsSelector = () =>
  useSelector((state: StateRoot) => state.products);
