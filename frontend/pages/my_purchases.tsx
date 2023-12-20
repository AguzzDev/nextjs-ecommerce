import { useState } from "react";

import Layout from "components/Layout";
import { FilterOrders } from "components/FilterOrders";
import { DropdownFilterOrders } from "components/Dropdown/DropdownFilterOrders";
import { getAllOrders } from "store/actions/order";
import { withAuthAndDispatch } from "hoc/withAuthAndDispatch";
import { filterOrders } from "utils/filterOrders";

const myPurchases = () => {
  const [filterValue, setFilterValue] = useState<number>(0);
  const [active, setActive] = useState(false);

  const toogleActive = () => {
    setActive(!active);
  };

  const orders = filterOrders(filterValue);

  return (
    <Layout title="Mis compras">
      <section className="mx-auto xl:w-7/12">
        <h1 className="my-3 text-3xl text-center">Mis compras</h1>

        <div className="flex justify-end py-3">
          <DropdownFilterOrders
            active={active}
            setFilterValue={setFilterValue}
            toogleActive={toogleActive}
            filterValue={filterValue}
          />
        </div>

        <div className="flex flex-col space-y-2">
          {orders.length === 0 ? (
            <div className="flex items-center justify-center bg-white py-32">
              <h1 className="text-xl">Aun no compraste</h1>
            </div>
          ) : (
            orders
              .map((values, i) => (
                <FilterOrders key={i} values={values} i={i} />
              ))
              .reverse()
          )}
        </div>
      </section>
    </Layout>
  );
};

export default withAuthAndDispatch(myPurchases, { actions: getAllOrders });
