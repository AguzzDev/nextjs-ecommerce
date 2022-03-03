import Link from "next/link"

import Layout from "components/Layout"
import { useSelector } from "react-redux"
import { CartItems } from "components/CartItems"
import { priceFormat } from "utils/format"

const Cart = () => {
  const cart = useSelector((state) => state.cart)

  return (
    <Layout title={`Carrito (${cart.products.length} artículos)`}>
      <section className="flex space-x-8 my-5">
        <div
          className={`bg-white w-4/6 ${
            cart.products.length === 0 ? "h-screen" : "h-full"
          } p-5`}
        >
          <h1 className="text-2xl">Tu carrito</h1>

          <div className="flex flex-col">
            <CartItems />
          </div>
        </div>

        <div className="sticky top-20 flex flex-col bg-white p-5 w-2/6 h-[35vh]">
          <h1 className="text-2xl">Total</h1>

          <div className="flex flex-col space-y-3 justify-center h-full">
            <div className="flex">
              <p className="w-3/4">Subtotal</p>
              <p>{priceFormat(cart.total)}</p>
            </div>
            <div className="flex">
              <p className="w-3/4">Envio</p>
              <p>$ 0,00</p>
            </div>
            <div className="flex">
              <p className="w-3/4">Total (IVA incluido)</p>
              <p>{priceFormat(cart.total)}</p>
            </div>
          </div>
          <div className="flex items-end">
            <Link href="/checkout">
              <button className="py-3 px-5 w-full bg-black text-white rounded-md">
                Pagar
              </button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Cart
