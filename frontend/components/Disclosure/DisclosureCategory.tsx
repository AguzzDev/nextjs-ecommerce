import { Disclosure } from "@headlessui/react";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";

import { IconXS } from "../Icons";
import { colorType } from "utils/format";
import { DisclosureCategoryInterface } from "interfaces";

export const DisclosureCategory: React.FC<DisclosureCategoryInterface> = ({
  section,
  setFilter,
  setOperationType,
}) => {
  return (
    <>
      <Disclosure
        defaultOpen
        as="div"
        key={section.id}
        className="px-4 py-6 border-t "
      >
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
                    ? "grid-cols-6 grid gap-5 "
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
                        onClick={() => {
                          setFilter((v) => ({
                            ...v,
                            color: {
                              label:
                                option.value.substring(0, 1).toUpperCase() +
                                option.value.slice(1),
                              value: option.value,
                            },
                          }));
                          setOperationType(section.id);
                        }}
                        className="w-5 h-5 rounded-full"
                        style={{
                          backgroundColor: colorType(option.value),
                        }}
                      />
                    ) : section.id === "category" ? (
                      <button
                        onClick={() => {
                          setFilter((v) => ({
                            ...v,
                            category: {
                              label:
                                option.value.substring(0, 1).toUpperCase() +
                                option.value.slice(1),
                              value: option.value,
                            },
                          }));
                          setOperationType(section.id);
                        }}
                        className="w-full text-left"
                      >
                        <p className="flex-1 ml-3 text-gray-500">
                          {option.label}
                        </p>
                      </button>
                    ) : section.id === "price" ? (
                      <button
                        onClick={() => {
                          setFilter((v) => ({
                            ...v,
                            sort: {
                              label:
                                option.value === "asc"
                                  ? "Ascendente"
                                  : "Descendente",
                              value: option.value,
                            },
                          }));
                          setOperationType(section.id);
                        }}
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
  );
};
