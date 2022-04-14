import {
  USER_REGISTER,
  USER_LOGIN,
  USER_LOGOUT,
} from "store/constants/actionsType"
import router from "next/router"

export const auth = (state = { user: [] }, action) => {
  switch (action.type) {
    case USER_REGISTER:
    case USER_LOGIN:
      localStorage.setItem("profile", JSON.stringify(action.payload))
      router.reload()
      return { ...state, user: action.payload }

    case USER_LOGOUT:
      localStorage.removeItem("profile")
      router.reload()
      return { ...state, user: [] }

    default:
      return state
  }
}
