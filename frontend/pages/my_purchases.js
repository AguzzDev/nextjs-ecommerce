import { Disclosure, Menu } from "@headlessui/react"
import {
  AdjustmentsIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/outline"
import { IconXS } from "components/Icons"
import Layout from "components/Layout"
import { useState } from "react"
import { useSelector } from "react-redux"
import {
  dateMonthFormat,
  priceFormat,
  cardBrand,
  titleFilter,
} from "utils/format"
import Image from "next/image"
import moment from "moment"
import { Slider } from "components/Slider"

const myPurchases = () => {
  const [filterValue, setFilterValue] = useState("all")
  const [active, setActive] = useState(false)
  const { orders } = useSelector((state) => state.order)

  const toogleActive = () => {
    setActive(!active)
  }

  const filterOrders = () => {
    let items = [...orders]

    if (filterValue === "last30Days") {
      const restDate = moment().subtract(30, "days").calendar()
      return items.filter(
        (a) => new Date(restDate) < new Date(Number(a.createdAt))
      )
    } else if (filterValue === "lastMonth") {
      const restDate = moment().subtract(1, "month").calendar()
      return items.filter(
        (a) => new Date(restDate) < new Date(Number(a.createdAt))
      )
    } else if (filterValue === "last3Month") {
      const restDate = moment().subtract(3, "months").calendar()
      return items.filter(
        (a) => new Date(restDate) < new Date(Number(a.createdAt))
      )
    } else if (filterValue === "last6Month") {
      const restDate = moment().subtract(6, "months").calendar()
      return items.filter(
        (a) => new Date(restDate) < new Date(Number(a.createdAt))
      )
    } else if (filterValue === "last12Month") {
      const restDate = moment().subtract(12, "months").calendar()
      return items.filter(
        (a) => new Date(restDate) < new Date(Number(a.createdAt))
      )
    } else if (filterValue === "all") {
      return items.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    }

    return items
  }
  return (
    <Layout title="Mis compras | Nike Clon">
      <section className="lg:w-7/12 mx-auto">
        <h1 className="text-3xl text-center my-3">Mis compras</h1>

        <div className="flex justify-end p-3">
          <Menu as="div" className="relative">
            <Menu.Button>
              <button
                className="flex space-x-2 bg-white px-3 py-1 rounded-md"
                onClick={() => toogleActive()}
              >
                <IconXS Icon={AdjustmentsIcon} props="rotate-90 transform" />
                <p className="px-5"> {titleFilter(filterValue)}</p>
                {active ? (
                  <IconXS Icon={ChevronDownIcon} />
                ) : (
                  <IconXS Icon={ChevronUpIcon} />
                )}
              </button>
            </Menu.Button>
            <Menu.Items className="absolute top-10 bg-white h-max w-full rounded-md p-3">
              <div className="flex flex-col space-y-3 items-start">
                <button onClick={() => setFilterValue("all")}>Todas</button>
                <button onClick={() => setFilterValue("last30Days")}>
                  Últimos 30 dias
                </button>
                <button onClick={() => setFilterValue("lastMonth")}>
                  Más de 1 mes
                </button>
                <button onClick={() => setFilterValue("last3Month")}>
                  Más de 3 meses
                </button>
                <button onClick={() => setFilterValue("last6Month")}>
                  Más de 6 meses
                </button>
                <button onClick={() => setFilterValue("last12Month")}>
                  Más de 12 meses
                </button>
              </div>
            </Menu.Items>
          </Menu>
        </div>

        <div className="flex flex-col space-y-2">
          {orders.length === 0 ? (
            <div className="flex justify-center items-center h-52 bg-white">
              <h1 className="text-xl">Aun no compraste</h1>
            </div>
          ) : (
            filterOrders().map(
              ({ createdAt, products, status, userInfo, total },i) => (
                <div key={i} className="w-full bg-white border-2 border-gray-300 rounded-sm">
                  <div className="p-2 border-b border-gray-300">
                    <p>{dateMonthFormat(createdAt)}</p>
                  </div>

                  <div className="flex justify-between p-2">
                    <div className="w-4/6">
                      <Slider products={products} />
                    </div>

                    <div className="w-2/6">
                      <Disclosure as="div" className="w-full">
                        <Disclosure.Button className="border border-gray-300 rounded-md py-3 px-5 w-full">
                          Mas detalles del pago
                        </Disclosure.Button>
                        <Disclosure.Panel className="p-2 border border-gray-300 rounded-md w-full h-full overflow-y-scroll">
                          <div>
                            <h1>Estado: {status}</h1>
                            <h1>Total: {priceFormat(total)}</h1>

                            <div>
                              <h1 className="text-xl">Envio</h1>
                              {userInfo.map(
                                ({
                                  address,
                                  city,
                                  state,
                                  postal_code,
                                  country,
                                  cardType,
                                  lastNumbers,
                                }) => (
                                  <div>
                                    <p>Direccion: {address}</p>
                                    <p>Ciudad: {city}</p>
                                    <h1 className="text-xl">
                                      Detalles de la tarjeta
                                    </h1>
                                    <div className="flex items-center space-x-3 w-full">
                                      <div className="relative">
                                        <div className="w-10 h-7 bg-gray-200 rounded-sm"></div>
                                        <div className="absolute top-0 left-1">
                                          <Image
                                            src={cardBrand(cardType)}
                                            height={30}
                                            width={30}
                                            objectFit="contain"
                                          />
                                        </div>
                                      </div>
                                      <p>
                                        <span className="uppercase">
                                          {cardType}
                                        </span>
                                        <span> **** {lastNumbers}</span>
                                      </p>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </Disclosure.Panel>
                      </Disclosure>
                    </div>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </section>
    </Layout>
  )
}

export default myPurchases
