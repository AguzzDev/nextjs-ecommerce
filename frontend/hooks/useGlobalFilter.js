import { useState } from "react"
import { useAsyncDebounce } from "react-table"
import "regenerator-runtime/runtime"

export const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  const [value, setValue] = useState(globalFilter)
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined)
  }, 300)

  return (
    <input
      className="my-3 py-2 px-3 w-2/6 bg-gray-200 dark:bg-gray-700 border dark:border-gray-800 border-gray-100 rounded-md"
      value={value || ""}
      onChange={(e) => {
        setValue(e.target.value)
        onChange(e.target.value)
      }}
      placeholder="Busca en la tabla"
    />
  )
}
