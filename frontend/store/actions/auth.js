import * as api from "lib/api"
import {
  GET_USER ,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
} from "store/constants/actionsType"

export const userRegister = (values) => async (dispatch) => {
  try {
    const { data } = await api.userRegister(values)

    dispatch({ type: USER_REGISTER, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const userLogin = (values) => async (dispatch) => {
  try {
    const { data } = await api.userLogin(values)

    dispatch({ type: USER_LOGIN, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const userLogout = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGOUT })
  } catch (error) {
    console.log(error)
  }
}
