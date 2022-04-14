import { TrashIcon } from "@heroicons/react/outline"
import { IconsXs } from "components/dashboard/Icons"
import Layout from "components/dashboard/Layout/Layout"
import useTable from "hooks/useTable"
import { Modal } from "components/dashboard/Modal/Modal"
import { Table } from "components/dashboard/Table/Table"
import useSWR from "swr"
import { API_URL } from "utils/urls"

export default function Productos() {
  const { data } = useSWR(`${API_URL}/products`)

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Acciones",
        Header: "Acciones",
        Cell: ({ row }) => (
          <div className="flex space-x-5">
            <Modal row={row}/>

            <button
              onClick={() => deleteRow(row, "product")}
              className="bg-gray-200 dark:bg-gray-700 bg-opacity-70 rounded-full w-[180px]  p-2 flex justify-center"
            >
              <IconsXs Icon={TrashIcon} />
              <h1 className="ml-1 font-semibold">Eliminar Producto</h1>
            </button>
          </div>
        ),
      },
    ])
  }
  const { productsData, columnData, deleteRow } = useTable(data?.data?.data)
  return (
    <>
      <Layout main="h-screen overflow-hidden" title="Productos - Dashboard">
        <main className="h-screen px-5 pt-5 pb-20">
          <Table columns={columnData} data={productsData} hooks={tableHooks} />
        </main>
      </Layout>
    </>
  )
}
