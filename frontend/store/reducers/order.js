import router from "next/router"
import {
  GET_ALL_ORDERS,
  GET_ORDER,
  SEND_ORDER,
} from "store/constants/actionsType"

export const order = (
  state = { orders: [], allOrders: [], completed: false },
  action
) => {
  switch (action.type) {
    case SEND_ORDER: {
      return { ...state, completed: true }
    }
    case GET_ORDER: {
      return { ...state, orders: action.payload }
    }
    case GET_ALL_ORDERS: {
      return { ...state, allOrders: action.payload }
    }
    default:
      return state
  }
}
