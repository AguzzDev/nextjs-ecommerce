import { Dispatch } from "redux";

import { api } from "lib/api";
import { ActionTypeEnum, ProductInterface } from "interfaces";

export const getFavourite = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.getFavourite();

    dispatch({
      type: ActionTypeEnum.GET_FAVOURITE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addFavourite = (id: string) => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.addFavourite(id);

    dispatch({
      type: ActionTypeEnum.ADD_FAVOURITE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeFavourite = (id: string) => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.removeFavourite(id);

    dispatch({
      type: ActionTypeEnum.REMOVE_FAVOURITE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
