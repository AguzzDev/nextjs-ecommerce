import { AuthReducerStateInterface } from "interfaces";
import { useSelector } from "react-redux";

interface StateRoot {
  auth: AuthReducerStateInterface;
}

export const useAuthSelector = () =>
  useSelector((state: StateRoot) => state.auth);
