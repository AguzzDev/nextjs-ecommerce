import Link from "next/link"
import { motion } from "framer-motion"

import { priceFormat } from "utils/format"
import { ButtonFavourite } from "./ButtonFavourite"

export const ProductsItems = ({ product, i, dataFiltered,id }) => {
  return (
    <motion.div
      hidden={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      transition={{ duration: 0.3 + i, ease: "backInOut" }}
      key={product.slug}
      className="flex flex-col w-full h-[50vh] bg-white border-2 border-gray-300 rounded-md"
    >
      <Link
        href={`/products/${product?.slug || product?.item?.slug}`}
        key={product?.slug || product?.item?.slug}
        passHref
      >
        <a className="flex items-center justify-center border-b border-gray-200 overflow-hidden h-screen">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{
              duration: 0.6,
              ease: [0.5, 0.01, -0.04, 0.9],
            }}
            src={
                  dataFiltered?.length === 0 || !dataFiltered
                ? product?.img[0]
                : product?.item?.img[0]
            }
            alt="Product image"
            className="object-cover w-full h-full"
          />
        </a>
      </Link>
      <div className="flex flex-col h-full px-3 pt-3">
        <Link
          href={`/products/${product?.slug || product?.item?.slug}`}
          key={product?.slug || product?.item?.slug}
          passHref
        >
          <a className="text-lg cursor-pointer h-[10vh]">
            {product?.title || product?.item?.title}
          </a>
        </Link>

        <div className="flex justify-between">
          <p className="pb-3 text-xl font-bold">
            {priceFormat(product?.price || product?.item?.price)}
          </p>

          <ButtonFavourite data={product} id={id} />
        </div>
      </div>
    </motion.div>
  )
}
