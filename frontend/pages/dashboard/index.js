import { Charts } from "components/dashboard/Chart/Charts"
import { TripleTable } from "components/dashboard/Info/TripleTable"
import { SmallTable } from "components/dashboard/Info/SmallTable"
import Layout from "components/dashboard/Layout/Layout"
import Layout2 from "components/shop/Layout"
import userChart from "data/Chart"
import { LargeTable } from "components/dashboard/Info/LargeTable"
import { useContext } from "react"
import UserContext from "context/User/UserContext"
import { useSelector } from "react-redux"
import { getAllOrders } from "store/actions/order"
import { useDispatchActions } from "hooks/useDispatchActions"
import { getAllUsers } from "store/actions/users"

export default function Home() {
  const { user } = useContext(UserContext)
  const { allOrders } = useSelector((state) => state.order)
  const { users } = useSelector((state) => state.users)

  const { loading } = useDispatchActions(getAllOrders())
  const { loading: loading2 } = useDispatchActions(getAllUsers())

  return (
    <>
      {!user.isAdmin ? (
        <Layout2>
          <h1 className="mt-5 text-xl">No tenes permisos para ingresar</h1>
        </Layout2>
      ) : (
        <Layout title="Inicio - Dashboard">
          <main className="w-full px-5">
            <TripleTable />
            <Charts
              title="Analitica de usuarios"
              data={userChart}
              dataKey="Usuarios Registrados"
            />

            <div className="flex mt-5 space-x-5">
              <div className="w-4/12">
                {!loading ? (
                  <SmallTable title="Ultimos usuarios" data={users} />
                ) : null}
              </div>
              <div className="w-8/12">
                {!loading2 ? (
                  <LargeTable title="Ultimas Transacciones" data={allOrders} />
                ) : null}
              </div>
            </div>
          </main>
        </Layout>
      )}
    </>
  )
}
