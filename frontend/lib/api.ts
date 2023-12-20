import axios from "axios";
import {
  ApiActions,
  LoginProps,
  ProductInterface,
  ProductOptionsValuesInterface,
  RegisterProps,
} from "interfaces";
import { API_URL } from "utils/urls";

const API = () => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
};
const APITOKEN = () => {
  const user = JSON.parse(window.localStorage.profile);

  return axios.create({
    baseURL: API_URL,
    headers: {
      token: `Bearer ${user.accessToken}`,
      "Access-Control-Allow-Origin": "*",
    },
  });
};

//History
const setHistory = (id: string) => APITOKEN().post("/history", { id });
const getHistoryUser = () => APITOKEN().get("/history/id");

//User
const userRegister = (values: RegisterProps) =>
  API().post("/auth/register", values);
const userLogin = (values: LoginProps) => API().post("/auth/login", values);
const forgetPassword = (email: string) =>
  API().post("/auth/forget-password", { email });
const changePassword = (param: any, values: any) =>
  API().post("/auth/change-password", { param, values });

//Products
const getProduct = (slug: string) => API().get(`/products/${slug}`);
const getAllProducts = () => API().get("/products");

//Payment
const createPayment = () => APITOKEN().post("/payment");
const getPaymentOrder = () => APITOKEN().get("/payment");

//Cart
const getCart = () => APITOKEN().get("/cart");
const addToCart = (id: string, product: ProductOptionsValuesInterface) =>
  APITOKEN().post("/cart", { id, product });
const removeItemCart = (id: string) => APITOKEN().put("/cart", { id });
const deleteCart = () => APITOKEN().delete("/cart");

//Favourite
const getFavourite = () => APITOKEN().get("/favourite/id");
const addFavourite = (id: string) => APITOKEN().post("/favourite", { id });
const removeFavourite = (id: string) =>
  APITOKEN().post("/favourite/findItem/id", { id });

//Order
const getAllOrders = () => APITOKEN().get("/orders");

export const api: ApiActions = {
  setHistory,
  getHistoryUser,
  userRegister,
  userLogin,
  forgetPassword,
  changePassword,
  getProduct,
  getAllProducts,
  createPayment,
  getPaymentOrder,
  getCart,
  addToCart,
  removeItemCart,
  deleteCart,
  getFavourite,
  addFavourite,
  removeFavourite,
  getAllOrders,
};
