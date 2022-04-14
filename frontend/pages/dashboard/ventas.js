import { Charts } from "components/dashboard/Chart/Charts"
import { LargeTable } from "components/dashboard/Info/LargeTable"
import Layout from "components/dashboard/Layout/Layout"
import { useDispatchActions } from "hooks/useDispatchActions"
import { useSelector } from "react-redux"
import { getAllOrders } from "store/actions/order"

const Ventas = () => {
  const { allOrders } = useSelector((state) => state.order)
  const { loading } = useDispatchActions(getAllOrders())

  return (
    <Layout props="px-5">
      <section className="mb-5">
        <h1 className="text-3xl font-bold">Ventas</h1>
        <Charts data={allOrders[0]?.total} dataKey="ventas" />
      </section>

      <section>
        <div className="flex flex-col space-y-2 w-2/4">
          {loading ? (
            <h1>Cargando...</h1>
          ) : (
            <LargeTable title="Transacciones" data={allOrders} />
          )}
        </div>
      </section>
    </Layout>
  )
}

export default Ventas
