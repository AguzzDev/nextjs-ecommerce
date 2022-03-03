import axios from "axios"
import { parseCookies } from "nookies"
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
  const { profile } = parseCookies()
  const profileParse = JSON.parse(profile)

  return axios.create({
    baseURL: API_URL,
    headers: {
      token: `Bearer ${profileParse.accessToken}`,
      "Access-Control-Allow-Origin": "*",
    },
  })
}
//User
export const userRegister = (values) => API().post(`/auth/register`, values)
export const userLogin = (values) => API().post(`/auth/login`, values)
export const getUser = (id) => API().get(`/users/${id}`)
//Products
export const getAllProducts = () => API().get(`/products`)
export const getFilteredProducts = (params) =>
  API().get(
    `/products?category=${params.categoryC}&color=${params.colorC}&size=${params.sizeC}`
  )
export const getProductById = (slug) => API().get(`/products/${slug}`)
export const deleteProduct = (id) => API().get(`products/${id}`)

//Cart
export const getCart = (id) => APITOKEN().get(`/users/cart/${id}`)
export const addToCart = (product) => APITOKEN().post(`/users/cart`, product)
export const removeItem = ({ id, productId }) =>
  APITOKEN().post(`/users/cart/findItem/${id}`, { productId })
export const deleteCart = (id) => APITOKEN().delete(`/users/cart/${id}`)

//Favourite
export const getFavourite = (id) => APITOKEN().get(`/users/favourite/${id}`)
export const addFavourite = (product) =>
  APITOKEN().post(`/users/favourite`, product)
export const removeFavourite = ({ userId, productId }) =>
  APITOKEN().post(`/users/favourite/findItem/${userId}`, { productId })
export const deleteFavourite = (id) =>
  APITOKEN().delete(`/users/favourite/${id}`)

//Order
export const sendOrder = (params) => APITOKEN().post(`/orders`, params)
export const getOrder = (userId, accessToken) =>
  APITOKEN().get(`/orders/${userId}`, accessToken)
