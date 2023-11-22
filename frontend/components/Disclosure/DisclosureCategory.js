import { Disclosure } from "@headlessui/react"
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline"

import { IconXS } from "../Icons"
import { colorType } from "utils/format"

export const DisclosureCategory = ({
  section,
  setColor,
  setSize,
  setCategory,
  setSort,
}) => {
  return (
    <>
      <Disclosure as="div" key={section.id} className="px-4 py-6 border-t ">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex items-center justify-between w-full px-2 text-gray-400 hover:text-gray-500">
              <span className="font-medium text-gray-900">{section.name}</span>
              <span className="flex items-center ml-6">
                {open ? (
                  <IconXS Icon={MinusSmIcon} />
                ) : (
                  <IconXS Icon={PlusSmIcon} />
                )}
              </span>
            </Disclosure.Button>

            <Disclosure.Panel className="pt-6">
              <div
                className={`${
                  section.id === "color"
                    ? "grid-cols-10 grid gap-5 "
                    : section.options.length >= 4
                    ? "grid-cols-2 grid gap-y-3"
                    : "flex-col space-y-3"
                } flex`}
              >
                {section.options.map((option) => (
                  <>
                    {section.id === "color" ? (
                      <button
                        value={option.value}
                        onClick={() => setColor(option.value)}
                        className="w-5 h-5 rounded-full"
                        style={{
                          backgroundColor: colorType(option.value),
                        }}
                      />
                    ) : section.id === "category" ? (
                      <button
                        name={option.id}
                        onClick={() => setCategory(option.value)}
                        className="w-full text-left"
                      >
                        <p className="flex-1 ml-3 text-gray-500">
                          {option.label}
                        </p>
                      </button>
                    ) : section.id === "price" ? (
                      <button
                        name={option.id}
                        onClick={() => setSort(option.value)}
                        className="w-full text-left"
                      >
                        <p className="flex-1 ml-3 text-gray-500">
                          {option.label}
                        </p>
                      </button>
                    ) : section.id === "size" ? (
                      <button
                        name={option.id}
                        onClick={() => setSize(option.value)}
                        className="w-full text-left"
                      >
                        <p className="flex-1 ml-3 text-gray-500">
                          {option.label}
                        </p>
                      </button>
                    ) : section.id === "size2" ? (
                      <button
                        name={option.id}
                        onClick={() => setSize(option.value)}
                        className="w-full text-left"
                      >
                        <p className="flex-1 ml-3 text-gray-500">
                          {option.label}
                        </p>
                      </button>
                    ) : null}
                  </>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  )
}
