import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import Fuse from "fuse.js"
import Image from "next/image"

import { priceFormat } from "utils/format"
import { SearchIcon } from "@heroicons/react/outline"
import { getAllProducts } from "store/actions/product"
import { useMouseLeave } from "hooks/useMouseLeave"
import { IconXS } from "./Icons"

export const SearchInput = () => {
  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.products)
  const [active, setActive] = useState(false)
  const [data, setData] = useState([])
  const queryRef = useRef(null)

  useMouseLeave(queryRef, setActive)
  const productsData = products.data

  const variants = {
    closed: { width: -200, x: -20, opacity: 0 },
    open: {
      x: -30,
      width: 180,
      opacity: 1,
      background: "white",
      outline: "2px solid black",
      borderRadius: "5px",
      marginRight: "3px",
      zIndex: 10,
    },
  }

  const fuse = new Fuse(productsData, {
    keys: ["title", "categories"],
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

  const handleActive = () => {
    setActive(!active)
  }

  const handleSearch = () => {
    if (!queryRef.current) {
      clearTimeout(queryRef.current)
    }
    setTimeout(() => {
      const result = fuse.search(queryRef.current.value)
      setData(result)
    }, 500)
  }

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  useEffect(() => {
    if (!active) {
      queryRef.current.value = ""
      setData("")
    }
  }, [active])

  return (
    <div className="relative w-[13vw] flex flex-row-reverse items-center">
      <button onClick={handleActive} className="absolute">
        <IconXS Icon={SearchIcon} />
      </button>

      <motion.div
        animate={active ? "open" : "closed"}
        variants={variants}
        transition={
          active
            ? { duration: 3, ease: "easeOut" }
            : { duration: 3, delay: 1, ease: "easeInOut" }
        }
      >
        <input
          className={`${!active && "pointer-events-none"} bg-transparent px-3`}
          onChange={handleSearch}
          ref={queryRef}
        />
      </motion.div>

      <AnimatePresence>
        {data.length !== 0 ? (
          <div className="absolute top-10 -left-2">
            <div className="rounded-xl z-50 relative bg-opacity-90 bg-black py-2 w-[18.5vw] h-max">
              <div
                style={{
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                }}
                className="absolute w-4 h-3 bg-black left-20 -top-2"
              />
              <div className="flex flex-col space-y-3">
                {data.map((prod, i) => (
                  <Link key={i} href={`products/${prod.item.slug}`}>
                    <motion.div
                      exit={{ x: -10 }}
                      initial={{ x: -10 }}
                      animate={{ x: 10 }}
                      transition={{ duration: 0.7 + i }}
                      className="flex px-3 space-x-3 text-white cursor-pointer "
                    >
                      <div className="w-4/12">
                        <Image
                          src={prod.item.img[0]}
                          height={100}
                          width={100}
                          className="object-contain w-full h-full"
                        />
                      </div>
                      <div className="w-full">
                        <p>{prod.item.title}</p>
                        <p>{priceFormat(prod.item.price)}</p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
