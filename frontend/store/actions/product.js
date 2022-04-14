import { useUploadFiles } from "hooks/useUploadFiles"
import * as api from "lib/api"
import {
  LOADING_TRUE,
  LOADING_FALSE,
  GET_ALL_PRODUCTS,
} from "store/constants/actionsType"

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING_TRUE })
    const { data } = await api.getAllProducts()

    dispatch({ type: GET_ALL_PRODUCTS, payload: data })
    dispatch({ type: LOADING_FALSE })
  } catch (error) {
    console.log(error)
  }
}

export const createProduct = (param) => async (dispatch) => {
  try {
    await api.createProduct(param)
  } catch (error) {
    console.log(error)
  }
}

export const updateProduct =
  ({ newData, id }) =>
  async () => {
    try {
      const image = await useUploadFiles(newData[0].img)
      await api.updateProduct({ ...newData[0], img: image }, id)
    } catch (error) {
      console.log(error)
    }
  }

export const deleteProduct = (id) => async () => {
  try {
    await api.deleteProduct(id)
  } catch (error) {
    console.log(error)
  }
}
