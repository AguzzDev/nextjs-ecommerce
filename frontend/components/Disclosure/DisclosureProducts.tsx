import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";

import { IconXS } from "../Icons";
import { ClickEventType, DisclosureProductsInterface } from "interfaces";

export const DisclosureProducts: React.FC<DisclosureProductsInterface> = ({
  title,
  data,
  handle,
}) => {
  const handleClick = (e: ClickEventType) => {
    handle(e.currentTarget.value);
  };

  return (
    <>
      <Disclosure as="div" className="w-2/4 px-4 py-3 border border-gray-700">
        {({ open }: any) => (
          <>
            <Disclosure.Button className="flex items-center justify-between w-full px-2 text-gray-400">
              <p className="font-medium text-gray-900 uppercase">{title}</p>
              <span className="flex items-center ml-6">
                {open ? (
                  <IconXS Icon={ChevronUpIcon} props="text-gray-900" />
                ) : (
                  <IconXS Icon={ChevronDownIcon} props="text-gray-900" />
                )}
              </span>
            </Disclosure.Button>

            <Disclosure.Panel
              as="div"
              className="flex flex-col mt-2 border-t border-gray-300 max-h-32 overflow-y-scroll"
            >
              {data.map((v, i) => (
                <button
                  key={i}
                  className="w-full py-2 pl-3 text-left uppercase border-b border-gray-300"
                  value={v}
                  onClick={handleClick}
                >
                  {v}
                </button>
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};
