import React, { useMemo, useContext, useEffect, useState } from "react"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import Fuse from "fuse.js"
import { HeartIcon } from "@heroicons/react/outline"
import axios from "axios"
import { motion } from "framer-motion"

import { priceFormat } from "utils/format"
import { CatalogueNavbar } from "components/CatalogueNavbar"
import Layout from "components/Layout"
import { IconXS } from "components/Icons"
import { addFavourite, removeFavourite } from "store/actions/favourite"
import UserContext from "context/User/UserContext"
import { toast } from "react-toastify"
import { API_URL } from "utils/urls"

export default function Catalogue({ products }) {
  const [data, setData] = useState([])
  const [dataFiltered, setDataFiltered] = useState([])
  const [sort, setSort] = useState()
  const [color, setColor] = useState()
  const [category, setCategory] = useState(null)
  const [size, setSize] = useState(null)
  const dispatch = useDispatch()
  const { userId } = useContext(UserContext)

  const { favourite } = useSelector((state) => state.favourite)
  const allFavourites = favourite.map((c) => c.productId)

  const removeFilters = async () => {
    setColor(null)
    setCategory(null)
    setSize(null)
    setDataFiltered([])
  }

  useEffect(() => {
    setData(products.data)
  }, [products])

  const fuse = new Fuse(data, {
    keys: ["sort", "color", "categories", "size"],
    shouldSort: true,
    matchAllTokens: true,
    findAllMatches: true,
    includeScore: true,
    threshold: 0,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
  })
  useMemo(() => {
    if (category) {
      const result = fuse.search(category)
      setDataFiltered(result)
    }
    if (color) {
      const result = fuse.search(color)
      setDataFiltered(result)
    }
    if (size) {
      const result = fuse.search(size)
      setDataFiltered(result)
    }
  }, [sort, color, category, size])

  const toFilter = () => {
    return dataFiltered.length === 0 ? data : dataFiltered
  }

  const addItem = (product) => {
    toast.success("Agregado a favoritos", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      pauseOnHover: false,
      closeOnClick: true,
    }),
      dispatch(addFavourite({ userId, product }))
  }
  const removeItem = (product) => {
    toast.success("Eliminado de favoritos", {
      position: "top-right",
      progressStyle: "",
      autoClose: 1500,
      hideProgressBar: false,
      pauseOnHover: false,
      closeOnClick: true,
    }),
      dispatch(removeFavourite({ userId, product }))
  }

  return (
    <Layout title="Catalogo | Nike Clon">
      <section className="flex">
        <div className="w-5/12 border-x border-gray-300 mt-3">
          <CatalogueNavbar
            setColor={setColor}
            setCategory={setCategory}
            setSize={setSize}
            setSort={setSort}
            removeFilters={removeFilters}
          />
        </div>

        <div className=" grid w-full grid-cols-2 py-3 pl-3 gap-5 sm:grid-cols-3 lg:grid-cols-4 place-items-start">
          {!products.data ? (
            <h1>No products</h1>
          ) : (
            toFilter()?.map((product, i) => (
              <motion.div
                hidden={{ opacity: 0 }}
                animate={{ opacity: 100 }}
                transition={{ duration: 0.3 + i, ease: "backInOut" }}
                key={product.slug}
                className="flex flex-col w-full h-[50vh] bg-white border-2 border-gray-300 rounded-md"
              >
                <Link
                  href={`/products/${product.slug || product.item.slug}`}
                  key={product.slug || product.item.slug}
                  passHref
                >
                  <a className="flex items-center justify-center border-b border-gray-200 overflow-hidden h-screen">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        duration: 0.6,
                        ease: [0.5, 0.01, -0.04, 0.9],
                      }}
                      src={product.img || product.item.img}
                      alt="Product image"
                      className="object-cover w-full h-full"
                    />
                  </a>
                </Link>
                <div className="flex flex-col h-full px-3 pt-3">
                  <Link
                    href={`/products/${product.slug || product.item.slug}`}
                    key={product.slug || product.item.slug}
                    passHref
                  >
                    <a className="text-lg cursor-pointer h-[10vh]">
                      {product.title || product.item.title}
                    </a>
                  </Link>

                  <div className="flex justify-between">
                    <p className="pb-3 text-xl font-bold">
                      {priceFormat(product.price || product.item.price)}
                    </p>
                    <div>
                      {allFavourites !== [] &&
                      allFavourites.includes(product._id) ? (
                        <button
                          onClick={() => removeItem(product)}
                          className="flex items-center justify-center h-7 w-7 bg-black rounded-full"
                        >
                          <IconXS
                            Icon={HeartIcon}
                            props="text-white fill-current transform scale-110 active:scale-100 duration-300"
                          />
                        </button>
                      ) : (
                        <button
                          onClick={() => addItem(product)}
                          className="flex items-center justify-center h-7 w-7 bg-black rounded-full"
                        >
                          <IconXS
                            Icon={HeartIcon}
                            props="text-white hover:fill-current transform active:scale-110 duration-300"
                          />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const data = await axios.get(`${API_URL}/products`)

  return {
    props: {
      products: data.data,
    },
  }
}
