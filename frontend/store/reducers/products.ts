import {
  ActionReducerInterface,
  ActionTypeEnum,
  ProductReducerStateInterface,
} from "interfaces";

export const products = (
  state: ProductReducerStateInterface = {
    products: { items: [], length: 0 },
    product: null,
    isLoading: true,
  },
  action: ActionReducerInterface
): ProductReducerStateInterface => {
  switch (action.type) {
    case ActionTypeEnum.LOADING_TRUE:
      return { ...state, isLoading: true };
    case ActionTypeEnum.LOADING_FALSE:
      return { ...state, isLoading: false };
    case ActionTypeEnum.GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case ActionTypeEnum.GET_ALL_PRODUCTS:
      return {
        ...state,
        products: { items: action.payload.data, length: action.payload.items },
      };

    default:
      return state;
  }
};
