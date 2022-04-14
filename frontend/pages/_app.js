import { useRouter } from "next/router"
import { wrapper } from "store"
import { useDispatch } from "react-redux"
import React, { useEffect } from "react"
import { ToastContainer } from "react-toastify"
import { AnimatePresence } from "framer-motion"
import jwtDecode from "jwt-decode"
import axios from "axios"
import { SWRConfig } from "swr"

import { getOrder } from "store/actions/order"
import { getCart } from "store/actions/cart"
import { getFavourite } from "store/actions/favourite"
import { getHistoryUser } from "store/actions/history"
import SidebarProvider from "context/Sidebar/SidebarProvider"
import ModalProvider from "context/Modal/ModalProvider"
import DarkmodeProvider from "context/Darkmode/DarkmodeProvider"
import UserProvider from "context/User/UserProvider"

import "styles/globals.css"
import "react-toastify/dist/ReactToastify.css"
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css"
import "react-slidy/lib/styles.css"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"

const MyApp = ({ Component, pageProps }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"))
console.log(profile)
    if (profile) {
      const dateNow = new Date().getTime()
      const { exp } = jwtDecode(profile.accessToken)
      const expirationTime = exp * 1000

      if (dateNow >= expirationTime) {
        localStorage.removeItem("profile")
      }

      dispatch(getHistoryUser())
      dispatch(getCart())
      dispatch(getFavourite())
      dispatch(getOrder())
    }
  }, [])

  const Providers = (props) => {
    const { components = [], children } = props

    return (
      <>
        {components.reduceRight((acc, Comp) => {
          return <Comp>{acc}</Comp>
        }, children)}
      </>
    )
  }
  return (
    <SWRConfig value={{ fetcher: (url) => axios(url).then((res) => res) }}>
      <Providers
        components={[
          DarkmodeProvider,
          SidebarProvider,
          UserProvider,
          ModalProvider,
        ]}
      >
        <ToastContainer />
        <AnimatePresence exitBeforeEnter initial={false}>
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </Providers>
    </SWRConfig>
  )
}

export default wrapper.withRedux(MyApp)
