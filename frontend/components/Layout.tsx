import React from "react";
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "components/Navbar";
import { LayoutInterface } from "interfaces";

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1 } },
};

const Layout: React.FC<LayoutInterface> = ({
  children,
  props,
  sectionProps,
  title,
}) => {
  return (
    <>
      <Head>
        <title>{title} | Ecommerce</title>
        <link rel="shortcut icon" href="/nike.png" />
      </Head>

      <AnimatePresence mode="wait">
        <main className={`${props}`}>
          <Navbar />

          <motion.section
            {...variants}
            className={`${sectionProps} px-5 md:px-0 md:w-10/12 mx-auto`}
          >
            {children}
          </motion.section>
        </main>
      </AnimatePresence>
    </>
  );
};

export default Layout;
