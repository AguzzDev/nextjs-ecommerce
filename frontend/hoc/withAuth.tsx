import { useUser } from "context/User/UserProvider";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const withAuth = (WrappedComponent: React.ComponentType) => {
  return function HOC() {
    const router = useRouter();
    const { user, loading } = useUser();

    useEffect(() => {
      const checkAuth = async () => {
        if (!loading && !user) {
          await router.push("/");
        }
      };

      checkAuth();
    }, [loading]);

    return user ? <WrappedComponent /> : null;
  };
};
