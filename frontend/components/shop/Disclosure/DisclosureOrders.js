import { Disclosure } from "@headlessui/react"
import React from "react"
import { priceFormat } from "utils/format"

export const DisclosureOrders = ({ params }) => {
  const { status, userInfo, total } = params
  return (
    <Disclosure as="div" className="w-full">
      <Disclosure.Button className="w-full px-5 py-3 border border-gray-300 rounded-md">
        Mas detalles del pago
      </Disclosure.Button>
      <Disclosure.Panel className="w-full h-full p-2 border border-gray-300 rounded-md">
        <div>
          <p>Estado: {status}</p>
          <p>Total: {priceFormat(total)}</p>
          <div>
            <h2 className="text-xl">Envio</h2>
            {userInfo.map(({ address, city }) => {
              if (!address && !city) {
                return <h3>Retiras en el local</h3>
              } else {
                return (
                  <div>
                    <p>Direccion: {address}</p>
                    <p>Ciudad: {city}</p>
                  </div>
                )
              }
            })}
          </div>
        </div>
      </Disclosure.Panel>
    </Disclosure>
  )
}
