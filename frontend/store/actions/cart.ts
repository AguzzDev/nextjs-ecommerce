import { Dispatch } from "redux";
import { AxiosError } from "axios";

import { api } from "lib/api";
import { ActionTypeEnum, ProductOptionsValuesInterface } from "interfaces";
import { errReturn } from "utils/errReturn";

export const getCart = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.getCart();

    dispatch({ type: ActionTypeEnum.GET_USER_CART, payload: data });
  } catch (error) {
    const err = error as AxiosError;
    return err.response!.data;
  }
};

export const addToCart =
  ({ id, product }: { id: string; product: ProductOptionsValuesInterface }) =>
  async (dispatch: Dispatch): Promise<string | void> => {
    try {
      const { data } = await api.addToCart(id, product);

      dispatch({ type: ActionTypeEnum.ADD_TO_CART, payload: data });
    } catch (error: any) {
      return errReturn(error);
    }
  };

export const removeItemCart = (id: string) => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.removeItemCart(id);

    dispatch({ type: ActionTypeEnum.REMOVE_ITEM_CART, payload: data });
  } catch (error) {
    const err = error as AxiosError;
    return err.response!.data;
  }
};

export const deleteCart = () => async (dispatch: Dispatch) => {
  try {
    await api.deleteCart();

    dispatch({ type: ActionTypeEnum.DELETE_CART });
  } catch (error) {
    const err = error as AxiosError;
    return err.response!.data;
  }
};
