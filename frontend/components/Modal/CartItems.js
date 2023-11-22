import {TrashIcon } from "@heroicons/react/outline"
import { useDispatch, useSelector } from "react-redux"

import { removeItem } from "store/actions/cart"
import { IconXS } from "../Icons"
import { priceFormat } from "utils/format"

export const CartItems = ({ type }) => {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  return (
    <>
      {type === "modal"
        ? cart?.products?.map(
            ({ title, img, quantity, color, size, total, productId },i) => (
              <div key={i} className="flex border-2 border-gray-300 h-[25vh]">
                <div className="relative w-2/4">
                  <img src={img[0]} className="object-cover h-full" />
                  <button
                    onClick={() => dispatch(removeItem(productId))}
                    className="absolute top-1 left-1 h-8 w-8 rounded-full bg-black flex justify-center items-center"
                  >
                    <IconXS Icon={TrashIcon} props="text-white" />
                  </button>
                </div>
                <div className="flex flex-col space-y-1 w-full pl-3">
                  <h2 className="overflow-ellipsis text-lg">{title}</h2>
                  <div className="flex space-x-1">
                    <p>Talla:</p>
                    <p className="uppercase text-gray-600">{size}</p>
                  </div>
                  <div className="capitalize flex space-x-1">
                    <p>Color:</p>
                    <p className="text-gray-600">{color}</p>
                  </div>
                  <div className="flex space-x-1">
                    <p>Cantidad:</p>
                    <p className="text-gray-600">{quantity}</p>
                  </div>

                  <div className="h-full flex items-end">
                    <h2 className="text-lg">{priceFormat(total)}</h2>
                  </div>
                </div>
              </div>
            )
          )
        : cart?.products?.map(
            ({ title, img, quantity, color, size, total, productId }, i) => (
              <div key={i} className="py-5 flex space-x-3 border-b border-gray-300">
                <img src={img[0]} className="object-contain h-40 w-40" />

                <div className="flex flex-col space-y-1 w-full">
                  <h2 className="overflow-ellipsis text-xl">{title}</h2>

                  <div className="flex space-x-1 ">
                    <p>Talla:</p>
                    <p className="uppercase text-gray-600">{size}</p>
                  </div>
                  <div className="capitalize flex space-x-1">
                    <p>Color:</p>
                    <p className="text-gray-600">{color}</p>
                  </div>
                  <div className="flex space-x-1">
                    <p>Cantidad:</p>
                    <p className="text-gray-600">{quantity}</p>
                  </div>

                  <div className="flex items-end justify-between h-full">
                    <div className="flex">
                      <button
                        onClick={() => dispatch(removeItem(productId))}
                        className="flex space-x-1 pr-3"
                      >
                        <IconXS Icon={TrashIcon} />
                        <p className="text-sm">Eliminar</p>
                      </button>
                    </div>
                    <h2>{priceFormat(total)}</h2>
                  </div>
                </div>
              </div>
            )
          )}
    </>
  )
}
