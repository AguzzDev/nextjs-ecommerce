import { AxiosError } from "axios";

import { api } from "lib/api";
import { errReturn } from "utils/errReturn";

export const createPayment = () => async () => {
  try {
    const { data } = await api.createPayment();

    return data;
  } catch (error) {
    const err = error as AxiosError;
    return err.response!.data;
  }
};

export const getPaymentOrder = () => async () => {
  try {
    const { data } = await api.getPaymentOrder();

    return Promise.resolve(data);
  } catch (error: any) {
    return errReturn(error);
  }
};
