import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline"
import { Disclosure } from "@headlessui/react"

import filters from "json/data"
import { IconXS } from "components/Icons"
import { colorType } from "utils/format"

export const CatalogueNavbar = ({
  setColor,
  setSize,
  setCategory,
  setSort,
  removeFilters,
}) => {
  return (
    <>
      <section className="flex flex-col h-full">
        {filters?.map((section) => (
          <Disclosure as="div" key={section.id} className="px-4 py-6 border-t ">
            {({ open }) => (
              <>
                <h3 className="flow-root -mx-2 -my-3">
                  <Disclosure.Button className="flex items-center justify-between w-full px-2 py-3 text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">
                      {section.name}
                    </span>
                    <span className="flex items-center ml-6">
                      {open ? (
                        <IconXS Icon={MinusSmIcon} />
                      ) : (
                        <IconXS Icon={PlusSmIcon} />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className="pt-6">
                  <div
                    className={`${
                      section.id === "color"
                        ? "grid-cols-10 grid gap-5 "
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
                            style={{ backgroundColor: colorType(option.value) }}
                          />
                        ) : section.id === "category" ? (
                          <button
                            name={option.id}
                            onClick={() => setCategory(option.value)}
                            className="w-full text-left"
                          >
                            <h1 className="flex-1 min-w-0 ml-3 text-gray-500">
                              {option.label}
                            </h1>
                          </button>
                        ) : section.id === "size" ? (
                          <button
                            name={option.id}
                            onClick={() => setSize(option.value)}
                            className="w-full text-left"
                          >
                            <h1 className="flex-1 min-w-0 ml-3 text-gray-500">
                              {option.label}
                            </h1>
                          </button>
                        ) : section.id === "price" ? (
                          <button
                            name={option.id}
                            onClick={() => setSort(option.value)}
                            className="w-full text-left"
                          >
                            <h1 className="flex-1 min-w-0 ml-3 text-gray-500">
                              {option.label}
                            </h1>
                          </button>
                        ) : null}
                      </>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}

        <button onClick={removeFilters}>Eliminar filtros</button>
      </section>
    </>
  )
}
