import { motion } from "framer-motion"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { HeartIcon } from "@heroicons/react/outline"
import { useContext } from "react"
import { useRouter } from "next/router"

import Layout from "components/Layout"
import { formatDate, priceFormat } from "utils/format"
import { IconXS } from "components/Icons"
import UserContext from "context/User/UserContext"
import { removeFavourite } from "store/actions/favourite"

const Favourite = () => {
  const { favourite } = useSelector((state) => state.favourite)
  const { userId } = useContext(UserContext)
  const router = useRouter()

  const dispatch = useDispatch()
  return (
    <Layout>
      <section>
        <h1 className="text-3xl my-3">Tus articulos favoritos</h1>
        {favourite.length === 0 ? (
          <div className="mt-5">
            <h1 className="text-xl mb-3">No tienes productos favoritos</h1>
            <button
              onClick={() => router.push("/catalogue")}
              className="py-3 px-5 bg-black text-white font-medium rounded-sm"
            >
              Ve nuestros productos
            </button>
          </div>
        ) : (
          <div className="grid w-full grid-cols-3 gap-5 sm:grid-cols-4 lg:grid-cols-5 place-items-start">
            {favourite.map((product, i) => (
              <motion.div
                hidden={{ opacity: 0 }}
                animate={{ opacity: 100 }}
                transition={{ duration: 0.3 + i, ease: "backInOut" }}
                key={product.slug}
                className="flex flex-col w-full h-full duration-500 transform bg-white border-2 border-gray-300 rounded-md hover:-translate-y-1"
              >
                <Link
                  href={`/products/${product.slug}`}
                  key={product.slug}
                  passHref
                >
                  <a className="border-b border-gray-200">
                    <img
                      src={product.img}
                      alt="Product image"
                      className="object-cover w-full h-full cursor-pointer"
                    />
                  </a>
                </Link>
                <div className="flex flex-col px-3 pt-3 h-full">
                  <Link
                    href={`/products/${product.slug}`}
                    key={product.slug}
                    passHref
                  >
                    <a className="h-24">
                      <h1 className="text-lg ">{product.title}</h1>
                      <p className="text-sm mb-3">
                        Agregado el:
                        <span className="ml-1">{formatDate(product.createdAt)}</span>
                      </p>
                    </a>
                  </Link>
                  <div className="flex justify-between">
                    <p className="pb-3 text-xl font-bold">
                      {priceFormat(product.price)}
                    </p>
                    <div>
                      <button
                        onClick={() =>
                          dispatch(removeFavourite({ userId, product }))
                        }
                        className="flex items-center justify-center h-7 w-7 bg-black rounded-full"
                      >
                        <IconXS
                          Icon={HeartIcon}
                          props="text-white fill-current hover:fill-black"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  )
}
export default Favourite
