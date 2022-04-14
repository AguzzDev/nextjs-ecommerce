import {
  SEND_ORDER,
  GET_ORDER,
  GET_ALL_ORDERS,
} from "store/constants/actionsType"
import * as api from "lib/api"
import { profileUser } from "utils/profileUser"
import { useRouter } from "next/router"

export const sendOrder = (params) => async (dispatch) => {
  const { username, email } = profileUser()
  const allParams = { username, email, ...params }
  const router = useRouter()

  try {
    const { data } = await api.sendOrder(allParams)

    dispatch({ type: SEND_ORDER, payload: data })
    localStorage.removeItem("user_order")
    router.push("/")
  } catch (error) {
    console.log(error)
  }
}

export const getOrder = () => async (dispatch) => {
  try {
    const { data } = await api.getOrder()

    dispatch({ type: GET_ORDER, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const getAllOrders = () => async (dispatch) => {
  try {
    const { data } = await api.getAllOrders()

    dispatch({ type: GET_ALL_ORDERS, payload: data })
  } catch (error) {
    console.log(error)
  }
}
