import { ActionsHOCType } from "interfaces";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

export const withDispatch = (
  WrappedComponent: React.ComponentType<{ dispatch: Dispatch }>,
  { actions }: ActionsHOCType
) => {
  return function HOC() {
    const dispatch = useDispatch();
    const isArray = Array.isArray(actions);

    useEffect(() => {
      isArray ? actions.forEach((v) => dispatch(v())) : dispatch(actions());
    }, []);

    return <WrappedComponent dispatch={dispatch} />;
  };
};
