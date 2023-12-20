import { Disclosure } from "@headlessui/react";

import { OrderInterface } from "interfaces";
import { priceFormat } from "utils/format";

export const DisclosureOrders: React.FC<{ params: OrderInterface }> = ({
  params,
}) => {
  const { status, total, location, sending } = params;

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
            {!sending ? (
              <h3>Retiras en el local</h3>
            ) : (
              <div>
                <p>
                  Direccion: {location.address} {location.address_number}
                </p>
                <p>Codigo postal: {location.postal_code}</p>
              </div>
            )}
          </div>
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
};
