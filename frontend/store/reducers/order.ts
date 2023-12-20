import {
  ActionReducerInterface,
  ActionTypeEnum,
  OrderReducerStateInterface,
} from "interfaces";

export const order = (
  state: OrderReducerStateInterface = {
    orderId: null,
    orders: [],
    completed: false,
  },
  action: ActionReducerInterface
) => {
  switch (action.type) {
    case ActionTypeEnum.SEND_ORDER: {
      return { ...state, orderId: action.payload };
    }
    case ActionTypeEnum.GET_ALL_ORDERS: {
      return { ...state, orderId: null, orders: action.payload };
    }
    default:
      return state;
  }
};
