import Link from "next/link"
import { Popover } from "@headlessui/react"
import { useDispatch, useSelector } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import Fuse from "fuse.js"
import Image from "next/image"
import { HeartIcon, SearchIcon, UserIcon } from "@heroicons/react/outline"
import { useState, useContext, useRef, useEffect } from "react"

import LogoIcon from "public/logo"
import { CartModal } from "components/CartModal"
import { AuthModal } from "components/AuthModal"
import { IconXS } from "components/Icons"
import UserContext from "context/User/UserContext"
import { userLogout } from "store/actions/auth"
import { getAllProducts } from "store/actions/product"
import { priceFormat } from "utils/format"
import { useMouseLeave } from "hooks/useMouseLeave"

export default function Navbar() {
  const { user } = useContext(UserContext)
  const [active, setActive] = useState(false)
  const [data, setData] = useState([])
  const dispatch = useDispatch()
  const queryRef = useRef(null)

  useMouseLeave(queryRef,setActive)

  const { products } = useSelector((state) => state.products)
  const { favourite } = useSelector((state) => state.favourite)
  const productsData = products.data

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
    <section className="sticky top-0 z-50  bg-white py-1 border-b border-gray-200">
      <div className="flex items-center justify-between w-10/12 mx-auto">
        <div className="w-1/4">
          <Link href="/" passHref>
            <div>
              <LogoIcon />
            </div>
          </Link>
        </div>

        <div className="flex justify-center space-x-5 w-2/4">
          <Link href="/catalogue" passHref>
            <a>Catalogo</a>
          </Link>
          <Link href="/my_purchases" passHref>
            <a>Mis compras</a>
          </Link>
        </div>

        <div className="flex space-x-5 w-1/4">
          <div className="relative w-[13vw] flex flex-row-reverse items-center">
            <button onClick={handleActive} className="absolute">
              <IconXS Icon={SearchIcon} />
            </button>
            <AnimatePresence>
              <motion.div
                animate={active ? "open" : "closed"}
                variants={variants}
                transition={{ duration: 3, ease: "easeOut" }}
              >
                <input
                  className={`${
                    !active && "pointer-events-none"
                  } bg-transparent px-3`}
                  onChange={handleSearch}
                  ref={queryRef}
                />
              </motion.div>
            </AnimatePresence>
            <AnimatePresence>
              {data.length !== 0 ? (
                <div className="absolute top-10 -left-2">
                  <div className="rounded-xl z-50 relative bg-opacity-90 bg-black py-2 w-[18.5vw] h-max">
                    <div
                      style={{
                        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                      }}
                      className="absolute left-20 -top-2 bg-black w-4 h-3"
                    />
                    <div className="flex flex-col space-y-3">
                      {data.map((prod, i) => (
                        <Link href={`products/${prod.item.slug}`}>
                          <motion.div
                            exit={{ x: -10 }}
                            initial={{ x: -10 }}
                            animate={{ x: 10 }}
                            transition={{ duration: 0.7 + i }}
                            className="cursor-pointer flex space-x-3 text-white px-3 "
                          >
                            <div className="w-4/12">
                              <Image
                                src={prod.item.img}
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
          <Link href="/favourite">
            <button className="relative">
              <IconXS Icon={HeartIcon} />

              {favourite.length >= 1 && (
                <div className="flex items-center justify-center absolute -top-1 -right-3 h-5 w-5 bg-black rounded-full">
                  <h1 className="text-white">{favourite?.length}</h1>
                </div>
              )}
            </button>
          </Link>
          <CartModal />
          {!user ? (
            <AuthModal />
          ) : (
            <Popover className="relative flex items-center">
              <Popover.Button>
                <IconXS Icon={UserIcon} />
              </Popover.Button>

              <Popover.Panel
                style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                className="absolute top-7 left-[2px] bg-black bg-opacity-80 w-4 h-3"
              ></Popover.Panel>

              <Popover.Panel className="rounded-xl absolute top-8 -left-20 mt-2 bg-black bg-opacity-80 text-white text-center p-3 z-10 w-32">
                <h1 className="text-center">{user.username}</h1>
                <button className="mt-3" onClick={() => dispatch(userLogout())}>
                  Cerrar Sesión
                </button>
              </Popover.Panel>
            </Popover>
          )}
        </div>
      </div>
    </section>
  )
}
