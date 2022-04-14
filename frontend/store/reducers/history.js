import { GET_HISTORY_USER, SET_HISTORY } from "store/constants/actionsType"

export const history = (state = { history: [] }, action) => {
  switch (action.type) {
    case GET_HISTORY_USER:
      return { ...state, history: action.payload}
    case SET_HISTORY:
      return { ...state, history: [...state.history, action.payload] }
    default:
      return state
  }
}
