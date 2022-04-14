import * as api from "lib/api"
import {
  GET_USER,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
} from "store/constants/actionsType"

export const forgetPassword =
  ({ email }) =>
  async () => {
    try {
      const { data } = await api.forgetPassword(email)
    } catch (error) {
      console.log(error)
    }
  }

export const changePassword =
  ({ param, values }) =>
  async (dispatch) => {
    try {
      const { data } = await api.changePassword(param, values)

      dispatch({ type: USER_LOGIN, payload: data })
    } catch (error) {
      console.log(error)
    }
  }

export const userRegister = (values, setIsOpen) => async (dispatch) => {
  try {
    const { data, status } = await api.userRegister(values)

    if (status === 200) setIsOpen(false)

    dispatch({ type: USER_REGISTER, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const userLogin = (values, setIsOpen) => async (dispatch) => {
  try {
    const { data, status } = await api.userLogin(values)

    if (status === 200) setIsOpen(false)

    dispatch({ type: USER_LOGIN, payload: data })
  } catch (error) {
   console.log(error);
  }
}

export const userLogout = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGOUT })
  } catch (error) {
    console.log(error)
  }
}

export const getUser = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER })
  } catch (error) {
    console.log(error)
  }
}
