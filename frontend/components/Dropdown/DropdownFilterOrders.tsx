import React from "react";
import { Menu } from "@headlessui/react";
import {
  AdjustmentsIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/outline";

import { titleFilter } from "utils/format";
import { IconXS } from "components/Icons";
import { DropdownFilterOrdersInterface } from "interfaces";

export const DropdownFilterOrders: React.FC<DropdownFilterOrdersInterface> = ({
  filterValue,
  toogleActive,
  active,
  setFilterValue,
}) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button>
        <button
          className="flex px-3 py-1 space-x-2 bg-white rounded-md border-2 border-gray-300"
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
      <Menu.Items className="absolute w-full p-3 bg-white z-50 rounded-md top-10 h-max border-2 border-gray-300">
        <div className="flex flex-col space-y-3">
          <button
            className="text-left w-full"
            onClick={() => setFilterValue(0)}
          >
            Todas
          </button>
          <button
            className="text-left w-full"
            onClick={() => setFilterValue(1)}
          >
            Últimos 30 dias
          </button>
          <button
            className="text-left w-full"
            onClick={() => setFilterValue(2)}
          >
            Más de 3 meses
          </button>
          <button
            className="text-left w-full"
            onClick={() => setFilterValue(3)}
          >
            Más de 6 meses
          </button>
          <button
            className="text-left w-full"
            onClick={() => setFilterValue(4)}
          >
            Más de 12 meses
          </button>
        </div>
      </Menu.Items>
    </Menu>
  );
};
