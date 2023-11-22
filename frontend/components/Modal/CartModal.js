import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ShoppingCartIcon, XIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import Link from "next/link";

import { IconXS } from "components/Icons";
import { priceFormat } from "utils/format";
import { CartItems } from "./CartItems";

export const CartModal = () => {
  let [isOpen, setIsOpen] = useState(false);
  const cart = useSelector((state) => state.cart);

  return (
    <>
      <button className="relative" onClick={() => setIsOpen(true)}>
        <IconXS Icon={ShoppingCartIcon} />
        {cart?.products?.length >= 1 && (
          <div className="absolute flex items-center justify-center w-5 h-5 bg-black rounded-full -top-1 -right-3">
            <p className="text-white">{cart?.products?.length}</p>
          </div>
        )}
      </button>

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          className="fixed inset-0 flex"
          style={{ zIndex: 9999 }}
          as="div"
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="relative flex flex-col w-full h-full max-w-sm p-4 ml-auto overflow-y-auto  font-nike bg-white shadow-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Carrito</h2>
                <button
                  type="button"
                  className="flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 bg-white rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  <IconXS Icon={XIcon} />
                </button>
              </div>

              <div className="flex flex-col space-y-3 h-[80%] overflow-y-auto">
                <CartItems type="modal" />
              </div>

              {cart?.products?.length > 0 ? (
                <div className="my-2">
                  <h1 className="text-3xl font-medium">
                    Total: {priceFormat(cart.total)}
                  </h1>

                  <Link href="/cart">
                    <button className="w-full px-5 py-3 mt-3 text-white bg-black rounded-md">
                      Ir al carrito
                    </button>
                  </Link>
                </div>
              ) : null}
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
};
