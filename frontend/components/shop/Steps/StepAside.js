import { setCookie } from "nookies"
import { useDispatch } from "react-redux"
import { createPayment } from "store/actions/payment"
import { priceFormat } from "utils/format"
import { profileUser } from "utils/profileUser"

export const StepAside = ({
  cart,
  sending,
  navigation,
  formData,
  setFormData,
  act,
  total,
}) => {
  const dispatch = useDispatch()
  const userId = profileUser()?.user?._id

  return (
    <div className="sticky top-20 flex flex-col bg-white p-5 w-2/6 h-[35vh]">
      {act === "step1" ? (
        <>
          <h1 className="text-2xl">Detalles</h1>
          <div className="flex flex-col justify-center h-full space-y-3">
            <div className="flex">
              <p className="w-3/4">Subtotal</p>
              <p>{priceFormat(cart.total)}</p>
            </div>
            <div className="flex">
              <p className="w-3/4">Envio</p>
              <p>{priceFormat(sending)}</p>
            </div>
            <div className="flex">
              <p className="w-3/4">Total (IVA 21%)</p>
              <p>
                {priceFormat(
                  cart.total + sending + 0.21 * (cart.total + sending)
                )}
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <button
              onClick={async () => {
                setFormData({
                  ...formData,
                  sendingPrice: sending,
                  iva: 0.21 * (cart.total + sending),
                })
                await dispatch(
                  createPayment(
                    cart,
                    cart.total + sending + 0.21 * (cart.total + sending)
                  )
                )
                navigation.next()
              }}
              className="w-full px-5 py-3 text-white bg-black rounded-md"
            >
              Pagar
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl">Total</h1>

          <div className="flex flex-col justify-center h-full space-y-3">
            <div className="flex">
              <p className="w-3/4">Total</p>
              <p>{priceFormat(total)}</p>
            </div>
            <div className="pb-5">
              <p>Hace un pago de prueba</p>
              <ul>
                <li>Tarjeta: 5031 7557 3453 0604</li>
                <li>Vencimiento:11/25</li>
                <li>Codigo de seguridad: 123</li>
                <li>Nombre: APRO</li>
              </ul>
            </div>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                localStorage.setItem(
                  "user_order",
                  JSON.stringify({ userId, cart, total, formData })
                )
              }}
              className="w-full px-5 text-white bg-black rounded-md mercadopago"
            ></button>
          </div>
        </>
      )}
    </div>
  )
}
