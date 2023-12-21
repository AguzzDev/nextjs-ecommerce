import { useRouter } from "next/router";
import { wrapper } from "store";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import jwtDecode, { JwtPayload } from "jwt-decode";

import { getCart } from "store/actions/cart";
import { getFavourite } from "store/actions/favourite";
import ModalProvider from "context/Modal/ModalProvider";
import UserProvider from "context/User/UserProvider";
import { AppInterface, ProvidersFCInterface } from "interfaces";

import "styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import "react-slidy/lib/styles.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const MyApp: React.FC<AppInterface> = ({ Component, pageProps }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const getUser = localStorage.getItem("profile");
    const profile = getUser ? JSON.parse(getUser) : null;

    if (profile) {
      const dateNow = new Date().getTime();
      const { exp }: JwtPayload = jwtDecode(profile.accessToken);
      const expirationTime = exp! * 1000;

      if (dateNow >= expirationTime) {
        localStorage.removeItem("profile");
      }

      dispatch(getCart());
      dispatch(getFavourite());
    }
  }, []);

  const Providers: React.FC<ProvidersFCInterface> = (props) => {
    const { components = [], children } = props;

    return (
      <>
        {components.reduceRight((acc, Comp) => {
          return <Comp>{acc}</Comp>;
        }, children)}
      </>
    );
  };
  return (
    <Providers components={[UserProvider, ModalProvider]}>
      <ToastContainer />
      <AnimatePresence>
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </Providers>
  );
};

export default wrapper.withRedux(MyApp);
