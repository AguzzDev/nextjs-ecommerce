import { TrashIcon } from "@heroicons/react/outline"
import { IconsXs } from "components/dashboard/Icons"
import Layout from "components/dashboard/Layout/Layout"
import useTable from "hooks/useTable"
import { Table } from "components/dashboard/Table/Table"
import { getAllUsers } from "store/actions/users"
import { useSelector } from "react-redux"
import { useDispatchActions } from "hooks/useDispatchActions"

export default function Usuarios() {
  const { users } = useSelector((state) => state.users)

  useDispatchActions(getAllUsers())

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Acciones",
        Header: "Acciones",
        Cell: ({ row }) => (
          <button
            onClick={() => deleteRow(row)}
            className="flex justify-center w-6/12 py-2 bg-gray-200 rounded-full dark:bg-gray-700 bg-opacity-70"
          >
            <IconsXs Icon={TrashIcon} />
            <h1 className="ml-1 font-semibold">Eliminar Cuenta</h1>
          </button>
        ),
      },
    ])
  }
  const { productsData, columnData, deleteRow } = useTable(users)

  return (
    <>
      <Layout title="Usuarios - Dashboard">
        <main className="mx-5 mt-3">
          <Table columns={columnData} data={productsData} hooks={tableHooks} />
        </main>
      </Layout>
    </>
  )
}
