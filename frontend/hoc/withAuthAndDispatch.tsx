import { useUser } from "context/User/UserProvider";
import { ActionsHOCType } from "interfaces";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

export const withAuthAndDispatch = (
  WrappedComponent: React.ComponentType<{ dispatch: Dispatch }>,
  { actions }: ActionsHOCType
) => {
  return function HOC(props: { slug: string }) {
    const router = useRouter();
    const { user, loading } = useUser();
    const dispatch = useDispatch();
    const isArray = Array.isArray(actions);

    useEffect(() => {
      if (!loading && !user) {
        router.push("/");
      }

      if (isArray) {
        let isGetProduct =
          actions.name === "getProduct" || isArray
            ? actions.filter(({ name }) => name === "getProduct")[0]
            : false;

        if (!isGetProduct) {
          return actions.forEach((v) => dispatch(v()));
        }

        const removeToArray = actions.findIndex(
          ({ name }) => name === "getProduct"
        );
        actions.splice(removeToArray, 1);

        dispatch(isGetProduct(props.slug));
      }
      
      dispatch(actions());
    }, [loading]);

    return user ? <WrappedComponent dispatch={dispatch} /> : null;
  };
};
