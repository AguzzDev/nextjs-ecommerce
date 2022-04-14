import {
  ADD_FAVOURITE,
  GET_FAVOURITE,
  REMOVE_FAVOURITE,
} from "store/constants/actionsType"
import * as api from "lib/api"
import { profileUser } from "utils/profileUser"

export const getFavourite = () => async (dispatch) => {
  try {
    const { data } = await api.getFavourite()

    dispatch({ type: GET_FAVOURITE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const addFavourite = (product) => async (dispatch) => {
  try {
    const { data } = await api.addFavourite(product)

    dispatch({ type: ADD_FAVOURITE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const removeFavourite = (params) => async (dispatch) => {
  const productId = params._id || params.productId
  try {
    const { data } = await api.removeFavourite(productId)

    dispatch({ type: REMOVE_FAVOURITE, payload: data })
  } catch (error) {
    console.log(error)
  }
}
