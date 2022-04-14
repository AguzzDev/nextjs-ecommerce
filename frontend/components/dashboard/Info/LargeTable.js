import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline"
import { usePagination } from "hooks/usePagination"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { formatData, statusColor } from "utils"
import { priceFormat } from "utils/format"
import { IconsXs } from "../Icons"

export const LargeTable = ({ title, data }) => {
  const router = useRouter()

  const {
    filteredData,
    currentPage,
    buttonPage1,
    buttonPage2,
  } = usePagination(data, 20)
  return (
    <div className="darkmode p-5">
      <h1 className="text-xl font-semibold">{title}</h1>

      <div className="flex mt-3 font-semibold">
        <div className="w-2/6">
          <h1>Usuario</h1>
        </div>
        <div className="w-2/6">
          <h1>Fecha</h1>
        </div>
        <div className="w-1/6">
          <h1>Paga</h1>
        </div>
        <div className="w-1/6">
          <h1 className="text-center">Estado</h1>
        </div>
      </div>
      <div className="flex flex-col">
        {filteredData()
          .map(({ userInfo, total, createdAt, status }, i) => (
            <div key={i} className="flex justify-between items-center py-2">
              <div className="flex w-2/6">
                <div className="w-full flex flex-col">
                  <h1 className="truncate">{userInfo[0].name}</h1>
                </div>
              </div>
              <div className="w-2/6">
                <p>{formatData(createdAt)}</p>
              </div>
              <div className="w-1/6">
                <p>{priceFormat(total)}</p>
              </div>
              <div className="w-1/6 mx-auto">
                <p
                  style={{ background: statusColor(status) }}
                  className="rounded-xl text-center px-2 dark:text-black text-black`"
                >
                  {status}
                </p>
              </div>
            </div>
          ))
          .reverse()}
        {router.pathname === "/dashboard" ? (
          <Link href="/dashboard/ventas">
            <a className="font-bold">Ver mas</a>
          </Link>
        ) : (
          <div className="flex space-x-5 justify-center">
            <button className="darkmode py-2 px-5 text-black dark:text-white" onClick={buttonPage1}>
              <IconsXs Icon={ChevronLeftIcon} />
            </button>
            <button className="darkmode py-2 px-5 text-black dark:text-white">{currentPage}</button>
            <button className="darkmode py-2 px-5 text-black dark:text-white" onClick={buttonPage2}>
              <IconsXs Icon={ChevronRightIcon} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
