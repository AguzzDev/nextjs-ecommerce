import { Disclosure } from "@headlessui/react"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline"

import { IconXS } from "../Icons"

export const DisclosureProducts = ({ title, data, dataHandle, handle }) => {
  return (
    <>
      <Disclosure
        as="div"
        key={title}
        className="w-2/4 px-4 py-3 border border-gray-700"
      >
        {({ open }) => (
          <>
            <Disclosure.Button className="flex items-center justify-between w-full px-2 text-gray-400">
              <p className="font-medium text-gray-900">
                {dataHandle === 0 || !dataHandle ? title : dataHandle}
              </p>
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
              className="flex flex-col mt-2 border-t border-gray-300"
            >
              {data?.map((s) => (
                <button
                  className="w-full py-2 pl-3 text-left uppercase border-b border-gray-300"
                  value={s}
                  onClick={(e) => handle(e.target.value)}
                >
                  {s}
                </button>
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  )
}
