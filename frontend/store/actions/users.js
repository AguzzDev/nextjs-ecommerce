import * as api from "lib/api"
import { GET_ALL_USERS } from "store/constants/actionsType"

export const getAllUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getAllUsers()

    dispatch({ type: GET_ALL_USERS, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const deleteUser = (id) => async () => {
  try {
    await api.deleteUser(id)
  } catch (error) {
    console.log(error)
  }
}
