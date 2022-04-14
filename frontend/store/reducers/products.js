import {
  LOADING_TRUE,
  LOADING_FALSE,
  GET_ALL_PRODUCTS,
  GET_FILTERED_CATEGORIES,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from "store/constants/actionsType"

export const products = (
  state = { products: [], search: [], filter: [], isLoading: true },
  action
) => {
  switch (action.type) {
    case LOADING_TRUE:
      return { ...state, isLoading: true }
    case LOADING_FALSE:
      return { ...state, isLoading: false }
    case GET_ALL_PRODUCTS:
      return { ...state, products: action.payload }
    case GET_FILTERED_CATEGORIES:
      return {
        ...state,
        filter: action.payload,
      }
    default:
      return state
  }
}
