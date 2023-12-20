import { OrderReducerStateInterface } from "interfaces";
import { useSelector } from "react-redux";

interface StateRoot {
  order: OrderReducerStateInterface;
}

export const useOrderSelector = () =>
  useSelector((state: StateRoot) => state.order);
