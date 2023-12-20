import { TrashIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";

import { removeItemCart } from "store/actions/cart";
import { IconXS } from "../Icons";
import { priceFormat } from "utils/format";
import { useCartSelector } from "store/selectors/useCartSelector";

export const CartItems: React.FC<{ modal?: boolean }> = ({ modal = false }) => {
  const cart = useCartSelector();
  const dispatch = useDispatch();

  const Info = ({
    title,
    value,
  }: {
    title: string;
    value: string[] | number;
  }) => (
    <p className="text-sm">
      {title}
      <span className="uppercase text-gray-600 pl-1">{value}</span>
    </p>
  );

  return (
    <>
      {cart?.products?.map(
        ({ title, img, quantity, color, size, price, cartId }, i) => (
          <>
            {modal ? (
              <div key={i} className="flex border-2 border-gray-300 ">
                <div className="relative w-2/4">
                  <img src={img[0]} className="object-cover h-full" />
                  <button
                    onClick={async () =>
                      await dispatch(removeItemCart(cartId!))
                    }
                    className="absolute top-1 left-1 h-8 w-8 rounded-full bg-black flex justify-center items-center"
                  >
                    <IconXS Icon={TrashIcon} props="text-white" />
                  </button>
                </div>
                <div className="flex flex-col space-y-1 w-full pl-3">
                  <h2 className="overflow-ellipsis text-lg">{title}</h2>
                  <Info title="Talla" value={size} />
                  <Info title="Color" value={color} />
                  <Info title="Cantidad" value={quantity} />

                  <div className="h-full flex items-end">
                    <h2 className="text-lg">{priceFormat(price)}</h2>
                  </div>
                </div>
              </div>
            ) : (
              <div
                key={i}
                className="py-5 flex space-x-3 border-b border-gray-300"
              >
                <img src={img[0]} className="object-contain h-40 w-40" />

                <div className="flex flex-col space-y-1 w-full">
                  <h2 className="overflow-ellipsis text-xl">{title}</h2>

                  <Info title="Talla" value={size} />
                  <Info title="Color" value={color} />
                  <Info title="Cantidad" value={quantity} />

                  <div className="flex items-end justify-between h-full">
                    <div className="flex">
                      <button
                        onClick={async () =>
                          await dispatch(removeItemCart(cartId!))
                        }
                        className="flex space-x-1 pr-3"
                      >
                        <IconXS Icon={TrashIcon} />
                        <p className="text-sm">Eliminar</p>
                      </button>
                    </div>
                    <h2>{priceFormat(price)}</h2>
                  </div>
                </div>
              </div>
            )}
          </>
        )
      )}
    </>
  );
};
