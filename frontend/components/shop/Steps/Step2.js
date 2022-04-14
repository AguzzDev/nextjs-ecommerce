import { ItemsSlider } from "components/shop/ItemsSlider"
import UserContext from "context/User/UserContext"
import { parseCookies } from "nookies"
import { useContext, useEffect } from "react"
import { useSelector } from "react-redux"
import { useMercadopago } from "react-sdk-mercadopago/lib"
import { StepAside } from "./StepAside"
import { StepsHeader } from "./stepsHeader"

export function Step2({ stepId, formData }) {
  const cart = useSelector((state) => state.cart)
  const { sendingPrice, iva } = formData
  const total = cart.total + iva + sendingPrice
  const { userId } = useContext(UserContext)

  const { pId } = parseCookies()
  const { sending } = formData

  const mercadopago = useMercadopago.v2(
    "TEST-f657524d-5964-4b26-a159-1e827488d9da",
    {
      locale: "es-AR",
    }
  )

  useEffect(() => {
    if (mercadopago) {
      mercadopago.checkout({
        preference: {
          id: pId,
        },
        render: {
          container: ".mercadopago",
        },
      })
    }
  }, [mercadopago])
  return (
    <>
      <section className="flex my-8 space-x-8">
        <div className="w-4/6 h-full p-5 bg-white">
          <div className="relative">
            <div className="flex justify-between w-full px-10 ">
              <StepsHeader
                title="Dirección"
                num="1"
                value="step1"
                act={stepId}
              />
              <StepsHeader title="Pago" num="2" value="step2" act={stepId} />
              <StepsHeader title="¡Hecho!" num="3" value="step3" act={stepId} />
            </div>
          </div>

          <div className="px-4 mt-3">
            {sending ? (
              <h2>Detalles de Envio</h2>
            ) : (
              <h2>Detalles de Envio: Retiras en el local</h2>
            )}

            <div className="flex flex-col mt-3 space-y-3">
              {sending ? (
                <>
                  <div className="px-5 py-2 border border-gray-300 rounded-md">
                    {formData.address}
                  </div>
                  <div className="flex space-x-5">
                    <div className="w-full px-5 py-2 border border-gray-300 rounded-md">
                      {formData.country}
                    </div>
                    <div className="w-full px-5 py-2 border border-gray-300 rounded-md">
                      {formData.province}
                    </div>
                  </div>
                  <div className="flex space-x-5">
                    <div className="w-full px-5 py-2 border border-gray-300 rounded-md">
                      {formData.city}
                    </div>
                    <div className="w-full px-5 py-2 border border-gray-300 rounded-md">
                      {formData.postal_code}
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>

        <StepAside
          userId={userId}
          cart={cart}
          total={total}
          formData={formData}
          act={stepId}
        />
      </section>
    </>
  )
}
