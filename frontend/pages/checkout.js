import Layout from "components/Layout"
import { priceFormat } from "utils/format"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { loadStripe } from "@stripe/stripe-js"
import {
  CardExpiryElement,
  CardCvcElement,
  CardNumberElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"

import { deleteCart } from "store/actions/cart"
import UserContext from "context/User/UserContext"
import { sendOrder } from "store/actions/order"
import { useContext } from "react"
import { useState } from "react"

const Form = () => {
  const [userInfo, setUserInfo] = useState(false)
  const { userId } = useContext(UserContext)
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const billing_details = {
      address: {
        city: e.target.city.value,
        line1: e.target.address.value,
        state: e.target.province.value,
        postal_code: e.target.postalCode.value,
        country: e.target.country.value,
      },
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(
        CardNumberElement,
        CardCvcElement,
        CardExpiryElement
      ),
      billing_details,
    })
    if (!error) {
      dispatch(sendOrder({ userId, paymentMethod, cart }))
      dispatch(deleteCart(userId))
    }
  }

  return (
    <form className="flex flex-col space-y-3 h-full" onSubmit={handleSubmit}>
      <div>
        <h1>Pago con tarjeta</h1>
        <div className="border border-gray-300">
          <CardNumberElement className="p-1" />
          <div className="flex w-full border-t border-gray-300">
            <CardExpiryElement className="p-1 w-2/4 border-r border-gray-300" />
            <CardCvcElement className="p-1 w-2/4" />
          </div>
        </div>
      </div>

      <div>
        <h1>Datos personales</h1>
        <div className="flex space-x-5 justify-between">
          <button
            onClick={() => setUserInfo(1)}
            className={`${
              userInfo === 1 && "bg-black w-full"
            }py-3 px-5 border border-gray-300 rounded-md w-full`}
          >
            <h1 className={`${userInfo === 1 && "text-white"}`}>
              Retirar en el local
            </h1>
          </button>
          <button
            onClick={() => setUserInfo(2)}
            className={`${
              userInfo === 2 && "bg-black w-full"
            }py-3 px-5 border border-gray-300 rounded-md w-full`}
          >
            <h1 className={`${userInfo === 2 && "text-white"}`}>
              Usar mi direccion
            </h1>
          </button>
          <button
            onClick={() => setUserInfo(3)}
            className={`${
              userInfo === 3 && "bg-black"
            } py-3 px-5 border border-gray-300 rounded-md w-full`}
          >
            <h1 className={`${userInfo === 3 && "text-white"}`}>
              Usar otra direccion
            </h1>
          </button>
        </div>
      </div>

      <div>
        {userInfo === 2 ? (
          <h1>My adress</h1>
        ) : userInfo === 3 ? (
          <>
            <div className="flex">
              <div className="w-2/4 border border-gray-300">
                <input name="country" className="w-full" placeholder="Pais" />
              </div>
              <div className="w-2/4 border border-gray-300">
                <input
                  name="province"
                  className="w-full"
                  placeholder="Provincia"
                />
              </div>
            </div>
            <div className="flex">
              <div className="w-2/4 border border-gray-300">
                <input name="city" className="w-full" placeholder="Localidad" />
              </div>
              <div className="w-2/4 border border-gray-300">
                <input
                  name="postalCode"
                  className="w-full"
                  placeholder="Codigo postal"
                />
              </div>
            </div>
            <div className="border border-gray-300">
              <input
                name="address"
                className="w-full"
                placeholder="Direccion"
              />
            </div>
          </>
        ) : null}
      </div>
      <div className="flex items-end h-full">
        <button className="bg-black py-3 px-5 text-white font-medium rounded-sm mt-3 w-full">
          Pagar
        </button>
      </div>
    </form>
  )
}

const Checkout = () => {
  const { completed } = useSelector((state) => state.order)
  const cart = useSelector((state) => state.cart)
  return (
    <Layout>
      {!completed ? (
        <section className="flex space-x-8 my-8">
          <div className="w-4/6 bg-white h-[80vh] p-5">
            <Elements stripe={loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)}>
              <Form />
            </Elements>
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
          </div>
        </section>
      ) : (
        <section className="grid place-content-center bg-white h-[80vh] my-8">
          <h1 className="text-6xl text-center mb-3">Gracias por tu compra</h1>
          <Link href="/"><a className="w-40 text-center mx-auto bg-black px-5 py-3 rounded-md text-white">Volver a la tienda</a></Link>
        </section>
      )}
    </Layout>
  )
}

export default Checkout
