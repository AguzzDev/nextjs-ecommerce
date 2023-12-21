import Link from "next/link";
import { HeartIcon } from "@heroicons/react/outline";
import { useContext } from "react";

import { IconXS } from "components/Icons";
import { CartModal } from "components/Modal/CartModal";
import { AuthModal } from "components/Modal/AuthModal";
import UserContext from "context/User/UserContext";
import { DropdownUser } from "./Dropdown/DropdownUser";
import { useFavouriteSelector } from "store/selectors/useFavouriteSelector";

export default function Navbar() {
  const { user, loading } = useContext(UserContext);
  const { favourite } = useFavouriteSelector();

  return !loading ? (
    <section className="sticky z-50 top-0 py-1 bg-white border-b border-gray-200">
      <div className="flex items-center px-5 md:px-0 md:w-10/12 mx-auto py-3">
        <div className="w-[27%]">
          <Link href="/" passHref>
            <button className="text-xl underline underline-offset-4">
              Tienda
            </button>
          </Link>
        </div>

        <div className="flex justify-center w-full space-x-5">
          <Link href="/catalogue" passHref>
           Catalogo
          </Link>
          {user ? (
            <Link href="/my_purchases" passHref>
              Mis compras
            </Link>
          ) : null}
        </div>

        <div className="flex justify-end w-[17%] space-x-5">
          {user ? (
            <>
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
            </>
          ) : null}

          {!user ? <AuthModal /> : <DropdownUser user={user} />}
        </div>
      </div>
    </section>
  ) : null;
}
