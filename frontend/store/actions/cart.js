import {
  ADD_TO_CART,
  REMOVE_ITEM,
  DELETE_CART,
  GET_USER_CART,
} from "store/constants/actionsType"
import * as api from "lib/api"

export const getCart = (id) => async (dispatch) => {
  try {
    const { data } = await api.getCart(id)

    dispatch({ type: GET_USER_CART, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const addToCart = (product) => async (dispatch) => {
  try {
    const { data } = await api.addToCart(product)

    dispatch({ type: ADD_TO_CART, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const removeItem = (id, productId) => async (dispatch) => {
  try {
    const { data } = await api.removeItem({ id, productId })

    dispatch({ type: REMOVE_ITEM, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const deleteCart = (id) => async (dispatch) => {
  try {
    await api.deleteCart(id)

    dispatch({ type: DELETE_CART })
  } catch (error) {
    console.log(error)
  }
}
