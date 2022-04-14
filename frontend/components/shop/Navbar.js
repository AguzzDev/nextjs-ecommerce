import Link from "next/link"
import { useSelector } from "react-redux"
import { HeartIcon } from "@heroicons/react/outline"
import { useContext } from "react"

import { IconXS } from "components/shop/Icons"
import { CartModal } from "components/shop/Modal/CartModal"
import { AuthModal } from "components/shop/Modal/AuthModal"
import UserContext from "context/User/UserContext"
import { DropdownUser } from "./Dropdown/DropdownUser"
import { SearchInput } from "./SearchInput"

export default function Navbar() {
  const { user } = useContext(UserContext)
  const { favourite } = useSelector((state) => state.favourite)

  return (
    <section
      style={{ zIndex: 500 }}
      className="fixed top-0 py-1 w-full bg-white border-b border-gray-200"
    >
      <div className="flex items-center justify-between px-5 md:px-0 md:w-10/12 mx-auto py-3">
        <div className="w-1/4">
          <Link href="/" passHref>
            <button className="text-xl underline underline-offset-4">
              Tienda
            </button>
          </Link>
        </div>

        <div className="flex justify-center w-2/4 space-x-5">
          <Link href="/catalogue" passHref>
            <a>Catalogo</a>
          </Link>
          <Link href="/my_purchases" passHref>
            <a>Mis compras</a>
          </Link>
        </div>

        <div className="flex w-1/4 space-x-5">
          <SearchInput />

          <Link href="/favourite">
            <button className="relative">
              <IconXS Icon={HeartIcon} />

              {favourite.length >= 1 && (
                <div className="absolute flex items-center justify-center w-5 h-5 bg-black rounded-full -top-1 -right-3">
                  <p className="text-white">{favourite?.length}</p>
                </div>
              )}
            </button>
          </Link>

          <CartModal />

          {!user ? <AuthModal /> : <DropdownUser user={user} />}
        </div>
      </div>
    </section>
  )
}
