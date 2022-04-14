import { useMemo } from "react"
import { useDispatch } from "react-redux"

import { deleteProduct } from "store/actions/product"
import { deleteUser } from "store/actions/users"
import useSWR from "swr"
import { descFormat, priceFormat } from "utils/format"
import { API_URL } from "utils/urls"

export default function useTable(data) {
  const { mutate } = useSWR(`${API_URL}/products`)
  const dispatch = useDispatch()
  const columnDictionary = [
    "Producto",
    "Descripcion",
    "Imagen",
    "Categorias",
    "Talla",
    "Color",
    "Precio",
  ]
  const productsData = useMemo(() => data, [data])

  const columnData = useMemo(
    () =>
      !productsData || productsData.length === 0
        ? []
        : Object.keys(productsData[0])
            .filter(
              (key) =>
                key !== "__v" &&
                key !== "_id" &&
                key !== "createdAt" &&
                key !== "updatedAt" &&
                key !== "slug"
            )
            .map((key, i) => {
              if (key === "img")
                return {
                  Header: columnDictionary[i],
                  accessor: key,
                  Cell: ({ value }) => (
                    <img
                      style={{ width: "100%", height: "100px" }}
                      src={value[0]}
                      className="object-contain"
                    />
                  ),
                }
              if (key === "desc")
                return {
                  Header: columnDictionary[i],
                  accessor: key,
                  Cell: ({ value }) => <>{descFormat(value)}</>,
                }
              if (key === "price")
                return {
                  Header: columnDictionary[i],
                  accessor: key,
                  Cell: ({ value }) => <>{priceFormat(value)}</>,
                }
              return { Header: columnDictionary[i], accessor: key }
            }),
    [data]
  )

  const deleteRow = async (row, id) => {
    const dataCopy = [...productsData]
    dataCopy.splice(row.id, 1)
    
    id === "product"
      ? await dispatch(deleteProduct(row?.original?._id))
      : await dispatch(deleteUser(row?.original?._id))

    await mutate(`${API_URL}/products`)
  }

  return { productsData, columnData, deleteRow }
}
