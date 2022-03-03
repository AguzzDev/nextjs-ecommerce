import * as api from "lib/api"
import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  LOADING_TRUE,
  LOADING_FALSE,
  GET_FILTERED_PRODUCTS,
} from "store/constants/actionsType"

export const getFilteredProducts = (params) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_TRUE })
    const { data } = await api.getFilteredProducts(params)

    dispatch({ type: GET_ALL_PRODUCTS, payload: data })
    dispatch({ type: LOADING_FALSE })
  } catch (error) {
    console.log(error)
  }
}

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING_TRUE })
    const { data } = await api.getAllProducts()

    dispatch({ type: GET_FILTERED_PRODUCTS, payload: data })
    dispatch({ type: LOADING_FALSE })
  } catch (error) {
    console.log(error)
  }
}

export const getProductById = (slug) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_TRUE })

    const { data } = await api.getProductById(slug)

    dispatch({ type: GET_PRODUCT_BY_ID, payload: data })
    dispatch({ type: LOADING_FALSE })
  } catch (error) {
    console.log(error)
  }
}

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_TRUE })

    const { data } = await api.deleteProduct(id)

    dispatch({ type: GET_PRODUCT_BY_ID, payload: data })
    dispatch({ type: LOADING_FALSE })
  } catch (error) {
    console.log(error)
  }
}
