import router from "next/router";
import {
  ActionReducerInterface,
  ActionTypeEnum,
  AuthReducerStateInterface,
} from "interfaces";

export const auth = (
  state: AuthReducerStateInterface = { user: null },
  action: ActionReducerInterface
) => {
  switch (action.type) {
    case ActionTypeEnum.USER_REGISTER:
    case ActionTypeEnum.USER_LOGIN:
      localStorage.setItem("profile", JSON.stringify(action.payload));
      router.reload();
      return { ...state, user: action.payload };

    case ActionTypeEnum.USER_LOGOUT:
      localStorage.removeItem("profile");
      router.push("/");
      return { ...state, user: [] };

    default:
      return state;
  }
};
