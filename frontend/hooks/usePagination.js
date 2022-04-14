import { useState } from "react"

export function usePagination(data, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1)
  const maxPage = Math.ceil(data.length / itemsPerPage)

  const filteredData = () => {
    const begin = (currentPage - 1) * itemsPerPage
    const end = begin + itemsPerPage

    return data.slice(begin, end)
  }

  const buttonPage1 = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1))
  }

  const buttonPage2 = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage))
  }
  const buttonLastPage = () => {
    setCurrentPage(maxPage)
  }
  const buttonInitPage = () => {
    setCurrentPage(1)
  }
  return {
    currentPage,
    filteredData,
    buttonPage1,
    buttonPage2,
    buttonLastPage,
    maxPage,
    buttonInitPage,
  }
}
