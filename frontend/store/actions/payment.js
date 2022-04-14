import * as api from "lib/api"
import { setCookie } from "nookies"

export const createPayment = (cart, total) => async () => {
  try {
    const { data } = await api.createPayment(cart, total)

    setCookie(null, "pId", data, { maxAge: 60 })
  } catch (error) {
    console.log(error)
  }
}
