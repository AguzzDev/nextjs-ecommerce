import router from "next/router"
import { GET_ORDER, SEND_ORDER } from "store/constants/actionsType"

export const order = (state = { orders: [], completed: false }, action) => {
  switch (action.type) {
    case SEND_ORDER: {
      return { ...state, completed: true }
    }
    case GET_ORDER: {
      return { ...state, orders: action.payload }
    }
    default:
      return state
  }
}
