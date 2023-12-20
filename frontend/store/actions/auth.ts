import { Dispatch } from "redux";

import { api } from "lib/api";
import {
  ActionTypeEnum,
  DispatchStateBoolean,
  LoginProps,
  RegisterProps,
} from "interfaces";
import { errReturn } from "utils/errReturn";

export const forgetPassword =
  ({ email }: { email: string }) =>
  async () => {
    try {
      const { data } = await api.forgetPassword(email);
    } catch (error) {
      console.log(error);
    }
  };

export const changePassword =
  ({ param, values }: any) =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await api.changePassword(param, values);

      dispatch({ type: ActionTypeEnum.USER_LOGIN, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const userRegister =
  (values: RegisterProps, setIsOpen: DispatchStateBoolean) =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await api.userRegister(values);

      setIsOpen(false);
      dispatch({ type: ActionTypeEnum.USER_REGISTER, payload: data });
    } catch (error: any) {
      return errReturn(error);
    }
  };

export const userLogin =
  (values: LoginProps, setIsOpen: DispatchStateBoolean) =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await api.userLogin(values);

      setIsOpen(false);
      dispatch({ type: ActionTypeEnum.USER_LOGIN, payload: data });
    } catch (error: any) {
      return errReturn(error);
    }
  };

export const userLogout = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: ActionTypeEnum.USER_LOGOUT });
  } catch (error: any) {
    return 
  }
};

