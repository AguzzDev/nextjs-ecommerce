import Link from "next/link";
import { useSelector } from "react-redux";

import Layout from "components/Layout";
import { priceFormat } from "utils/format";
import { CartItems } from "components/Modal/CartItems";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const total = cart.total + 0.21 * cart.total;

  return (
    <Layout title={`Carrito (${cart.products.length} artículos)`}>
      <section className="flex my-5 space-x-8">
        <div
          className={`bg-white w-4/6 ${
            cart.products.length === 0 ? "h-[70vh]" : "h-full"
          } p-5`}
        >
          <h1 className="text-2xl">Tu carrito</h1>
          {cart.products.length === 0 && <p>Tu carrito esta vacio.</p>}
          <div className="flex flex-col">
            <CartItems />
          </div>
        </div>

        <div className="sticky top-20 flex flex-col bg-white p-5 w-2/6 h-[35vh]">
          <h1 className="text-2xl">Total</h1>

          <div className="flex flex-col justify-center h-full space-y-3">
            <div className="flex">
              <p className="w-3/4">Subtotal</p>
              <p>{priceFormat(cart.total)}</p>
            </div>
            <div className="flex">
              <p className="w-3/4">Total (IVA 21%)</p>
              <p>{priceFormat(total)}</p>
            </div>
          </div>
          <div className="flex items-end">
            {cart.products.length >= 1 && (
              <Link href="/checkout">
                <button className="w-full px-5 py-3 text-white bg-black rounded-md">
                  Pagar
                </button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
