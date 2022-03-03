import React from "react"
import Head from "next/head"
import { LazyMotion, m, domAnimation } from "framer-motion"

import Navbar from "components/Navbar"

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1 } },
  exit: {
    opacity: 1,
    transition: { duration: 1, delay: 1 },
  },
}

const Layout = ({ children, props, sectionProps,title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href="/nike.png" />
      </Head>

      <LazyMotion features={domAnimation}>
        <m.main {...variants} className={`${props} w-screen h-screen`}>
          <Navbar />

          <section className={`${sectionProps} w-10/12 mx-auto h-full`}>
            {children}
          </section>
        </m.main>
      </LazyMotion>
    </>
  )
}

export default Layout
