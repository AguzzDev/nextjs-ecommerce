import {
  LOADING_TRUE,
  LOADING_FALSE,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  GET_FILTERED_PRODUCTS,
} from "store/constants/actionsType"

export const products = (
  state = { products: [], search: [], isLoading: true },
  action
) => {
  switch (action.type) {
    case LOADING_TRUE:
      return { ...state, isLoading: true }
    case LOADING_FALSE:
      return { ...state, isLoading: false }
    case GET_ALL_PRODUCTS:
    case GET_PRODUCT_BY_ID:
    case GET_FILTERED_PRODUCTS:
      return { ...state, products: action.payload }
    default:
      return state
  }
}
