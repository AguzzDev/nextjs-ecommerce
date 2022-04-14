import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@heroicons/react/outline"
import { IconsXs, IconsSm } from "components/dashboard/Icons"
import { Modal } from "components/dashboard/Modal/Modal"
import { GlobalFilter } from "hooks/useGlobalFilter"
import { useRouter } from "next/router"
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from "react-table"

export const Table = ({ columns, data, hooks }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
    setGlobalFilter,
    preGlobalFilteredRows,
    state,
  } = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    hooks,
    useGlobalFilter,
    useSortBy,
    usePagination
  )
  const { pathname } = useRouter()

  return (
    <div className="h-full overflow-y-hidden darkmode rounded-xl">
      <div className="flex items-center justify-between px-4 py-2">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          setGlobalFilter={setGlobalFilter}
          globalFilter={state.globalFilter}
        />
        {pathname === "/dashboard/productos" && <Modal />}
      </div>

      <div className="p-4 h-[35rem] overflow-y-scroll">
        {data?.length === 0 ? (
          <></>
        ) : (
          <table {...getTableProps()} className="max-w-[88vw]">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className="border-b border-gray-200 "
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="pl-3 text-left capitalize"
                    >
                      {column.render("Header")}
                      <button>
                        {column.isSortedDesc ? (
                          <IconsXs
                            Icon={ChevronDownIcon}
                            props={`dark:text-white text-black`}
                          />
                        ) : column.isSorted ? (
                          <IconsXs
                            Icon={ChevronUpIcon}
                            props={`dark:text-white text-black`}
                          />
                        ) : (
                          ""
                        )}
                      </button>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td className="p-3" {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
      <div className="flex items-center justify-between w-full px-4 pt-2">
        <div className="flex space-x-5">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            <IconsSm
              Icon={ChevronDoubleLeftIcon}
              props={`dark:text-white text-black`}
            />
          </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            <IconsSm
              Icon={ChevronLeftIcon}
              props={`dark:text-white text-black`}
            />
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            <IconsSm
              Icon={ChevronRightIcon}
              props={`dark:text-white text-black`}
            />
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <IconsSm
              Icon={ChevronDoubleRightIcon}
              props={`dark:text-white text-black`}
            />
          </button>
        </div>

        <span>
          <strong>
            Pagina {pageIndex + 1} de {pageOptions.length}
          </strong>
        </span>
      </div>
    </div>
  )
}
