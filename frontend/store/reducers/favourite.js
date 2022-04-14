import {
  ADD_FAVOURITE,
  DELETE_FAVOURITE,
  GET_FAVOURITE,
  REMOVE_FAVOURITE,
} from "store/constants/actionsType"

export const favourite = (state = { favourite: [] }, action) => {
  switch (action.type) {
    case ADD_FAVOURITE: {
      return {
        ...state,
        favourite: action.payload,
      }
    }
    case REMOVE_FAVOURITE: {
      return {
        ...state,
        favourite: state.favourite.filter(
          (pId) => pId.productId !== action.payload
        ),
      }
    }
    case GET_FAVOURITE: {
      return {
        ...state,
        favourite: action.payload,
      }
    }
    default:
      return state
  }
}
