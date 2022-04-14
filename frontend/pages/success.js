import { useRouter } from "next/router"
import Link from "next/link"
import { useEffect, useState } from "react"

import Layout from "components/shop/Layout"
import { StepsHeader } from "components/shop/Steps/stepsHeader"
import { deleteCart } from "store/actions/cart"
import { useDispatch } from "react-redux"
import { sendOrder } from "store/actions/order"

export const Success = () => {
  const [user, setUser] = useState()

  const router = useRouter()
  const dispatch = useDispatch()
  const query = router.query

  useEffect(() => {
    const user_order = localStorage.getItem("user_order")

    setUser(JSON.parse(user_order))
  }, [])

  const send = async () => {
    if (user) {
      const { userId, cart, total, formData } = user
      const paymentId = query.collection_id
      await dispatch(sendOrder({ paymentId, userId, cart, total, formData }))
      await dispatch(deleteCart())
    }
  }
  send()

  return (
    <Layout title="¡Hecho!">
      <section className="flex justify-center py-8 space-x-8">
        <div className="w-4/6 p-5 bg-white h-[80vh]">
          <div className="relative">
            <div className="flex justify-between w-full px-10 ">
              <StepsHeader title="Dirección" num="1" value="step1" />
              <StepsHeader title="Pago" num="2" value="step2" />
              <StepsHeader title="¡Hecho!" num="3" value="step3" />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center mt-20 text-center">
            {query.status === "approved" ? (
              <h1>Pago aprobado</h1>
            ) : (
              <h1>Pago rechazado</h1>
            )}
            <Link href="/">
              <a className="button">Volver a la tienda</a>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
export default Success
