import { GET_ALL_USERS } from "store/constants/actionsType"

export const users = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_ALL_USERS: {
      return {
        ...state,
        users: state.users.concat(action.payload),
      }
    }

    default:
      return state
  }
}
