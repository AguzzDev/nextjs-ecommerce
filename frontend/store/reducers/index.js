import { combineReducers } from "redux"

import { products } from "./products"
import { auth } from "./auth"
import { cart } from "./cart"
import { favourite } from "./favourite"
import { order } from "./order"

export default combineReducers({
  products,
  auth,
  cart,
  favourite,
  order,
})
