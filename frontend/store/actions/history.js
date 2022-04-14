import * as api from "lib/api"
import { GET_HISTORY_USER, SET_HISTORY } from "store/constants/actionsType"
import { profileUser } from "utils/profileUser"

export const setHistory = (id) => async (dispatch) => {
  try {
    const { data } = await api.setHistory(id)

    dispatch({ type: SET_HISTORY, payload: data })
  } catch (error) {
    console.log(error)
  }
}
export const getHistoryUser = () => async (dispatch) => {
  try {
    const id= profileUser()._id
    const { data } = await api.getHistoryUser(id)

    dispatch({ type: GET_HISTORY_USER, payload: data })
  } catch (error) {
    console.log(error)
  }
}
