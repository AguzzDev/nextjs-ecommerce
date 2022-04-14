import axios from "axios"
import { API_URL } from "utils/urls"

const API = () => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })
}
const APITOKEN = () => {
  const user = JSON.parse(window.localStorage.profile)

  return axios.create({
    baseURL: API_URL,
    headers: {
      token: `Bearer ${user.accessToken}`,
      "Access-Control-Allow-Origin": "*",
    },
  })
}

//History
export const setHistory = (id) => APITOKEN().post(`/history`, {id})
export const getHistoryUser = () => APITOKEN().get(`/history/id`)

//User
export const userRegister = (values) => API().post(`/auth/register`, values)
export const userLogin = (values) => API().post(`/auth/login`, values)
export const getUser = () => API().get(`/users/id`)
export const getAllUsers = () => APITOKEN().get("/users")
export const deleteUser = (id) => APITOKEN().delete(`/users/${id}`)
export const forgetPassword = (email) =>
  API().post("/auth/forget-password", { email })
export const changePassword = (param, values) =>
  API().post("/auth/change-password", { param, values })

//Products
export const createProduct = (data) => APITOKEN().post(`/products`, data)
export const getAllProducts = () => API().get(`/products`)
export const deleteProduct = (id) => APITOKEN().delete(`/products/${id}`)
export const updateProduct = (newData, id) =>
  APITOKEN().put(`/products/${id}`, newData)

//Cart
export const getCart = () => APITOKEN().get(`/users/cart/id`)
export const addToCart = (product) =>
  APITOKEN().post(`/users/cart`, { product })
export const removeItem = ( productId ) =>
  APITOKEN().post(`/users/cart/findItem/id`, { productId })
export const deleteCart = () => APITOKEN().delete(`/users/cart/id`)

//Favourite
export const getFavourite = () => APITOKEN().get(`/users/favourite/id`)
export const addFavourite = (product) =>
  APITOKEN().post(`/users/favourite`, product)
export const removeFavourite = (productId) =>
  APITOKEN().post(`/users/favourite/findItem/id`, { productId })

//Order
export const sendOrder = (params) => APITOKEN().post(`/orders`, params)
export const getOrder = (accessToken) =>
  APITOKEN().get(`/orders/id`, accessToken)
export const getAllOrders = () => APITOKEN().get(`/orders`)

//Payment
export const createPayment = (cart, total) =>
  APITOKEN().post("/payment", { cart, total })
