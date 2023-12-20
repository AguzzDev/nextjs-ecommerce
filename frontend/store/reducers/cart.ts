import {
  ActionReducerInterface,
  ActionTypeEnum,
  CartReducerStateInterface,
} from "interfaces";

export const cart = (
  state: CartReducerStateInterface = { products: [], total: 0 },
  action: ActionReducerInterface
) => {
  switch (action.type) {
    case ActionTypeEnum.ADD_TO_CART: {
      localStorage.removeItem("step");

      return {
        ...state,
        ...action.payload,
      };
    }
    case ActionTypeEnum.REMOVE_ITEM_CART: {
      localStorage.removeItem("step");

      return {
        ...state,
        total: state.total - action.payload.price,
        products: state.products.filter((p) => p.cartId !== action.payload._id),
      };
    }
    case ActionTypeEnum.GET_USER_CART: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case ActionTypeEnum.DELETE_CART: {
      localStorage.removeItem("step");

      return {
        ...state,
        products: [],
        total: 0,
      };
    }
    default:
      return state;
  }
};
