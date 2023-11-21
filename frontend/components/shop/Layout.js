import React from "react";
import Head from "next/head";
import { LazyMotion, m, domAnimation } from "framer-motion";

import Navbar from "components/shop/Navbar";

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1 } },
  exit: {
    opacity: 1,
    transition: { duration: 1, delay: 1 },
  },
};

const Layout = ({ children, props, sectionProps, title }) => {
  return (
    <>
      <Head>
        <title>{title} | Ecommerce</title>
        <link rel="shortcut icon" href="/nike.png" />
      </Head>

      <LazyMotion features={domAnimation}>
        <main className="shop-body">
          <m.main {...variants} className={`${props} w-full`}>
            <Navbar />

            <section
              className={`${sectionProps} px-5 md:px-0 md:w-10/12 pt-16 mx-auto mb-5 min-h-screen `}
            >
              {children}
            </section>
          </m.main>
        </main>
      </LazyMotion>
    </>
  );
};

export default Layout;
