import {
  ADD_TO_CART,
  REMOVE_ITEM,
  DELETE_CART,
  GET_USER_CART,
} from "store/constants/actionsType"

export const cart = (
  state = { products: [], total: 0, repeated: false },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART: {
      if (action.payload.repeated) {
        return {
          ...state,
          repeated: true,
        }
      } else {
        const price = action.payload.map((a) => a.total)
        const priceSum = price.reduce((a, b) => a + b)

        return {
          ...state,
          products: action.payload,
          total: priceSum,
        }
      }
    }
    case REMOVE_ITEM: {
      const product = state.products.filter(
        (p) => p.productId === action.payload
      )
      const price = product[0].total

      return {
        ...state,
        products: state.products.filter(
          (pId) => pId.productId !== action.payload
        ),
        total: parseFloat(state.total) - parseFloat(price),
      }
    }
    case DELETE_CART: {
      return { ...state, products: [], total: 0 }
    }
    case GET_USER_CART: {
      const price = action.payload.map((a) => a.total)
      const priceSum = price.reduce((a, b) => a + b)

      return {
        ...state,
        products: action.payload,
        total: priceSum,
      }
    }
    default:
      return state
  }
}
