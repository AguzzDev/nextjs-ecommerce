import { OrderInterface } from "interfaces";
import moment from "moment";
import { useOrderSelector } from "store/selectors/useOrderSelector";

export const filterOrders = (filterValue: number): OrderInterface[] => {
  const { orders } = useOrderSelector();

  let items = [...orders];
  const restDate = moment().subtract(filterValue, "month").calendar();
  const numberDateRest = new Date(restDate);

  if (filterValue === 1) {
    return items.filter((a) => new Date(a.createdAt) > numberDateRest);
  } else if (filterValue === 3) {
    const six = moment().subtract(6, "months").calendar();
    const sixRest = new Date(six);
    return items.filter(
      (a) =>
        new Date(a.createdAt) < numberDateRest &&
        new Date(a.createdAt) > sixRest
    );
  } else if (filterValue === 6) {
    const year = moment().subtract(12, "months").calendar();
    const yearRest = new Date(year);

    return items.filter(
      (a) =>
        new Date(a.createdAt) < numberDateRest &&
        new Date(a.createdAt) > yearRest
    );
  } else if (filterValue === 12) {
    return items.filter((a) => new Date(a.createdAt) < numberDateRest);
  } else {
    return items;
  }
};
