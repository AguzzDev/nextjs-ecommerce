import { motion } from "framer-motion"

import { priceFormat } from "utils/format"

export const ItemsSlider = ({ product, i }) => {
  return (
    <motion.div
      hidden={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      transition={{ duration: 0.3 + i, ease: "backInOut" }}
      key={i}
      className="flex flex-col w-full h-full duration-500 transform bg-white border-2 border-gray-300 rounded-md hover:-translate-y-1"
    >
      <a className="border-b border-gray-200">
        <img
          src={product.img}
          alt="Product image"
          className="object-cover cursor-pointer"
        />
      </a>

      <div className="px-1 py-2">
        <div className="h-[6rem]">
          <h2>{product.title}</h2>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between">
            <p className="pb-3 text-xl font-bold">
              {priceFormat(product.total)}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
