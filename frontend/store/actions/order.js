import { SEND_ORDER,GET_ORDER } from "store/constants/actionsType"
import * as api from "lib/api"

export const sendOrder = (params) => async (dispatch) => {
  try {
    const { data } = await api.sendOrder(params)

    dispatch({ type: SEND_ORDER, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const getOrder=(userId)=>async (dispatch)=>{
  try {
    const { data } = await api.getOrder(userId)

    dispatch({ type: GET_ORDER, payload: data })
  } catch (error) {
    console.log(error)
  }
}
