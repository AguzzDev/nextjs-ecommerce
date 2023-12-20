import Link from "next/link";

import Layout from "components/Layout";
import { priceFormat } from "utils/format";
import { CartItems } from "components/Cart/CartItems";
import { withAuth } from "hoc/withAuth";
import { useCartSelector } from "store/selectors/useCartSelector";

const Cart = () => {
  const cart = useCartSelector();

  return (
    <Layout title="Carrito">
      <section className="flex my-5 space-x-8">
        <div className="bg-white w-4/6 p-5">
          <h1 className="text-2xl">Tu carrito</h1>
          {cart.products.length === 0 && <p>Tu carrito esta vacio.</p>}
          <div className="flex flex-col">
            <CartItems />
          </div>
        </div>

        <div className="sticky top-20 flex flex-col bg-white p-5 w-2/6 h-full">
          <h1 className="text-2xl">Resumen de tu compra</h1>

          <div className="flex flex-col justify-center">
            <div className="flex justify-between py-2">
              <p>Total a pagar:</p>
              <p>{priceFormat(cart.total)}</p>
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

export default withAuth(Cart);
