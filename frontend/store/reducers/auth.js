import {
  USER_REGISTER,
  USER_LOGIN,
  USER_LOGOUT,
  GET_USER,
} from "store/constants/actionsType"
import router from "next/router"
import { destroyCookie, setCookie } from "nookies"

export const auth = (state = { user: [] }, action) => {
  switch (action.type) {
    case USER_REGISTER:
    case USER_LOGIN:
      setCookie(null, "profile", JSON.stringify(action.payload))
      router.reload()
      return { ...state, user: action.payload }
    case USER_LOGOUT:
      destroyCookie(null, "profile")
      router.reload()
      return { ...state, user: [] }
    default:
      return state
  }
}
