import { useState } from "react"
import { useSelector } from "react-redux"
import moment from "moment"

import Layout from "components/shop/Layout"
import { FilterOrders } from "components/shop/FilterOrders"
import { DropdownFilterOrders } from "components/shop/Dropdown/DropdownFilterOrders"

const myPurchases = () => {
  const [filterValue, setFilterValue] = useState(0)
  const [active, setActive] = useState(false)

  const toogleActive = () => {
    setActive(!active)
  }

  const { orders } = useSelector((state) => state.order)

  const filterOrders = () => {
    let items = [...orders]
    const restDate = moment().subtract(filterValue, "month").calendar()
    const numberDateRest = new Date(restDate)

    if (filterValue === 1) {
      return items.filter((a) => new Date(a.createdAt) > numberDateRest)
    } else if (filterValue === 3) {
      const six = moment().subtract(6, "months").calendar()
      const sixRest = new Date(six)
      return items.filter(
        (a) =>
          new Date(a.createdAt) < numberDateRest &&
          new Date(a.createdAt) > sixRest
      )
    } else if (filterValue === 6) {
      const year = moment().subtract(12, "months").calendar()
      const yearRest = new Date(year)

      return items.filter(
        (a) =>
          new Date(a.createdAt) < numberDateRest &&
          new Date(a.createdAt) > yearRest
      )
    } else if (filterValue === 12) {
      return items.filter((a) => new Date(a.createdAt) < numberDateRest)
    } else {
      return items
    }
  }

  return (
    <Layout title="Mis compras">
      <section className="mx-auto xl:w-7/12">
        <h1 className="my-3 text-3xl text-center ">Mis compras</h1>

        <div className="flex justify-end py-3">
          <DropdownFilterOrders
            active={active}
            setFilterValue={setFilterValue}
            toogleActive={toogleActive}
            filterValue={filterValue}
          />
        </div>

        <div className="flex flex-col space-y-2">
          {!orders.length === 0 ? (
            <div className="flex items-center justify-center bg-white h-52">
              <h1 className="text-xl">Aun no compraste</h1>
            </div>
          ) : (
            filterOrders()
              .map((param, i) => <FilterOrders key={i} param={param} i={i} />)
              .reverse()
          )}
        </div>
      </section>
    </Layout>
  )
}

export default myPurchases
