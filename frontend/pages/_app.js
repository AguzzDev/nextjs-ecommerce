import { ModalProvider } from "context/Modal/ModalProvider"
import { UserProvider } from "context/User/UserProvider"
import { wrapper } from "store"
import { useDispatch } from "react-redux"
import React, { useEffect } from "react"
import { getCart } from "store/actions/cart"
import { getFavourite } from "store/actions/favourite"
import { getOrder } from "store/actions/order"
import { ToastContainer } from "react-toastify"
import ReactGA from "react-ga"
import { AnimatePresence } from "framer-motion"
import { destroyCookie, parseCookies } from "nookies"
import jwtDecode from "jwt-decode"

import "styles/globals.css"
import "react-toastify/dist/ReactToastify.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"

const MyApp = ({ Component, pageProps, router }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const { profile } = parseCookies()

    if (profile) {
      const profileParse = JSON.parse(profile)

      const { exp } = jwtDecode(profileParse.accessToken)
      const expirationTime = exp * 1000 - 60000
      if (Date.now() >= expirationTime) {
        destroyCookie(null, "profile")
      }

      dispatch(getCart(profileParse._id))
      dispatch(getFavourite(profileParse._id))
      dispatch(getOrder(profileParse._id))
    }
  }, [])

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS) {
      ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS)
      ReactGA.pageview(window.location.pathname + window.location.search)

      const handleRouteChange = (url) => {
        ReactGA.pageview(url)
      }

      router.events.on("routeChangeComplete", handleRouteChange)

      return () => {
        router.events.off("routeChangeComplete", handleRouteChange)
      }
    }
  }, [])

  return (
    <UserProvider>
      <ModalProvider>
        <ToastContainer />
        <AnimatePresence exitBeforeEnter initial={false}>
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </ModalProvider>
    </UserProvider>
  )
}

export default wrapper.withRedux(MyApp)
