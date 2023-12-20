import { Dispatch } from "redux";

import { api } from "lib/api";
import { ActionTypeEnum } from "interfaces";

export const getProduct = (slug: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: ActionTypeEnum.LOADING_TRUE });
    const { data } = await api.getProduct(slug);

    dispatch({ type: ActionTypeEnum.GET_PRODUCT, payload: data });
    dispatch({ type: ActionTypeEnum.LOADING_FALSE });
  } catch (error) {
    console.log(error);
  }
};

export const getAllProducts = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: ActionTypeEnum.LOADING_TRUE });
    const { data } = await api.getAllProducts();

    dispatch({ type: ActionTypeEnum.GET_ALL_PRODUCTS, payload: data });
    dispatch({ type: ActionTypeEnum.LOADING_FALSE });
  } catch (error) {
    console.log(error);
  }
};
