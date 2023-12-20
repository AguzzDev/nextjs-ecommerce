import { HistoryReducerStateInterface } from "interfaces";
import { useSelector } from "react-redux";

interface StateRoot {
  history: HistoryReducerStateInterface;
}

export const useHistorySelector = () =>
  useSelector((state: StateRoot) => state.history);
