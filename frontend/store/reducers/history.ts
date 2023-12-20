import {
  ActionReducerInterface,
  ActionTypeEnum,
  HistoryReducerStateInterface,
} from "interfaces";

export const history = (
  state: HistoryReducerStateInterface = { history: [] },
  action: ActionReducerInterface
) => {
  switch (action.type) {
    case ActionTypeEnum.GET_HISTORY_USER:
      return { ...state, history: action.payload };
    case ActionTypeEnum.SET_HISTORY:
      return { ...state, history: [...state.history, action.payload] };
    default:
      return state;
  }
};
