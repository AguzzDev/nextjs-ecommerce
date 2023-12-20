import { Dispatch } from "redux";

import { api } from "lib/api";
import { ActionTypeEnum } from "interfaces";

export const setHistory = (id: string) => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.setHistory(id);

    dispatch({ type: ActionTypeEnum.SET_HISTORY, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const getHistoryUser = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.getHistoryUser();

    dispatch({ type: ActionTypeEnum.GET_HISTORY_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};
