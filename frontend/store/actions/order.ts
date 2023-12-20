import { Dispatch } from "redux";

import { api } from "lib/api";
import { ActionTypeEnum } from "interfaces";

export const getAllOrders = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.getAllOrders();

    dispatch({ type: ActionTypeEnum.GET_ALL_ORDERS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
