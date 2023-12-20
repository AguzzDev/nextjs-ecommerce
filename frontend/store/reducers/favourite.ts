import {
  ActionReducerInterface,
  ActionTypeEnum,
  FavouriteReducerStateInterface,
  ProductInterface,
} from "interfaces";

export const favourite = (
  state: FavouriteReducerStateInterface = { favourite: [] },
  action: ActionReducerInterface
) => {
  switch (action.type) {
    case ActionTypeEnum.ADD_FAVOURITE: {
      return {
        ...state,
        favourite: [...state.favourite, action.payload],
      };
    }
    case ActionTypeEnum.REMOVE_FAVOURITE: {
      return {
        ...state,
        favourite: state.favourite!.filter((pId) => pId._id !== action.payload),
      };
    }
    case ActionTypeEnum.GET_FAVOURITE: {
      return {
        ...state,
        favourite: action.payload,
      };
    }
    default:
      return state;
  }
};
