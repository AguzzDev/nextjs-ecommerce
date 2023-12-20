import { AxiosError } from "axios";

export const errReturn = (err: AxiosError) => {
  return Promise.reject(err.response!.data || "Error desconocido");
};
