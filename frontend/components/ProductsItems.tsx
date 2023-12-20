import Link from "next/link";
import { motion } from "framer-motion";

import { priceFormat } from "utils/format";
import { ButtonFavourite } from "./ButtonFavourite";
import { ProductsItemsInterface } from "interfaces";

export const ProductsItems: React.FC<ProductsItemsInterface> = ({
  product,
  i,
  id,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 + i, ease: "backInOut" }}
      key={product.slug}
      className="flex flex-col w-full h-[22rem] bg-white border-2 border-gray-300 rounded-md"
    >
      <Link href={`/products/${product?.slug}`} passHref>
        <a className="flex items-center justify-center border-b border-gray-200 overflow-hidden h-screen">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{
              duration: 0.6,
              ease: [0.5, 0.01, -0.04, 0.9],
            }}
            src={product?.img[0]}
            alt="Product image"
            className="object-cover w-full h-full"
          />
        </a>
      </Link>
      
      <div className="flex flex-col h-full px-3 pt-3">
        <Link href={`/products/${product?.slug}`} key={product?.slug} passHref>
          <a className="text-lg cursor-pointer h-[10vh]">{product?.title}</a>
        </Link>

        <div className="flex justify-between">
          <p className="pb-3 text-xl font-bold">
            {priceFormat(product?.price)}
          </p>

          <ButtonFavourite data={product._id} id={id} />
        </div>
      </div>
    </motion.div>
  );
};
