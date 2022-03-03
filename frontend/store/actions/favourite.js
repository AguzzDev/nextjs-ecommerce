import {
  ADD_FAVOURITE,
  DELETE_FAVOURITE,
  GET_FAVOURITE,
  REMOVE_FAVOURITE,
} from "store/constants/actionsType"
import * as api from "lib/api"

export const getFavourite = (id) => async (dispatch) => {
  try {
    const { data } = await api.getFavourite(id)

    dispatch({ type: GET_FAVOURITE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const addFavourite = ({ userId, product }) => async (dispatch) => {
  try {
    const { data } = await api.addFavourite({ userId, product })

    dispatch({ type: ADD_FAVOURITE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const removeFavourite = (params) => async (dispatch) => {
  const userId = params.userId
  const productId = params.product.productId || params.product._id

  try {
    const { data } = await api.removeFavourite({ userId, productId })

    dispatch({ type: REMOVE_FAVOURITE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const deleteFavourite = ({userId}) => async (dispatch) => {
  try {
    await api.deleteFavourite(userId)

    dispatch({ type: DELETE_FAVOURITE })
  } catch (error) {
    console.log(error)
  }
}
