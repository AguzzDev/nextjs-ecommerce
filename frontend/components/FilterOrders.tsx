import React, { useState } from "react";
import { motion } from "framer-motion";

import { dateMonthFormat } from "utils/format";
import { IconXS } from "components/Icons";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useMediaQuery } from "hooks/useMediaQuery";
import { Slider } from "components/Slider/Slider";
import { DisclosureOrders } from "./Disclosure/DisclosureOrders";
import { FilterOrdersInterface } from "interfaces";

export const FilterOrders: React.FC<FilterOrdersInterface> = ({
  values,
  i,
}) => {
  const { createdAt, products } = values;

  const isSmall = useMediaQuery("(max-width: 500px)");
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const variants = {
    closed: { height: 0, background: "white" },
    open: isSmall
      ? { height: 270, background: "white" }
      : { height: 300, background: "white" },
    closedItems: { opacity: 0, height: "100%" },
    openItems: { opacity: 1, height: "100%" },
  };

  return (
    <>
      <div key={i}>
        <div className="flex justify-between items-center px-5 py-2 bg-white border-x-2 border-t-2 border-gray-300 rounded-sm">
          <p>{dateMonthFormat(createdAt)}</p>

          <button onClick={toggleOpen} className="z-30 flex space-x-3">
            <p>Ver detalles</p>
            {open ? (
              <IconXS Icon={ChevronDownIcon} props="transform rotate-180" />
            ) : (
              <IconXS Icon={ChevronDownIcon} />
            )}
          </button>
        </div>

        <motion.div
          animate={open ? "open" : "closed"}
          exit={"closed"}
          variants={variants}
          transition={
            open
              ? { duration: 2, ease: "easeIn" }
              : { duration: 2, ease: "easeInOut" }
          }
          className="border-x-2 border-b-2 border-gray-300"
        >
          <motion.div
            animate={open ? "openItems" : "closedItems"}
            variants={variants}
            transition={open ? { delay: 2.5 } : { delay: 0 }}
            className="flex py-2 px-5 max-h-screen"
          >
            <div className="w-4/6 overflow-hidden">
              <Slider products={products} />
            </div>
            <div className="w-2/6">
              <DisclosureOrders params={values} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};
