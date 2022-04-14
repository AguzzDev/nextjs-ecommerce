import { useRouter } from "next/router"
import Link from "next/link"

import { IconsXs } from "components/dashboard/Icons"
import SidebarData from "data/Sidebar"
import { useContext } from "react"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MenuAlt1Icon,
} from "@heroicons/react/outline"
import SidebarContext from "context/Sidebar/SidebarContext"

export default function Sidebar() {
  const { active, toogleMenu } = useContext(SidebarContext)
  const { pathname } = useRouter()

  return (
    <main
      className={`flex flex-col  ${
        active ? "w-2/12" : "w-24"
      } h-screen sticky top-0 bg-gray-50 dark:bg-gray-900 dark:bg-opacity-40 bg-opacity-60 border dark:border-gray-800 border-gray-100`}
    >
      <div
        className={`${
          active && "px-5"
        } flex flex-col justify-between h-screen py-2`}
      >
        <div
          className={`flex ${
            !active ? "justify-center" : "justify-start"
          } mt-2`}
        >
          <button
            onClick={toogleMenu}
            className="transform duration-300 hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded-md"
          >
            <IconsXs Icon={MenuAlt1Icon} />
          </button>
        </div>
        <div className="flex flex-col space-y-3 h-full mt-10">
          {SidebarData.map(({ title, icon, path }, i) => (
            <Link key={i} href={`/dashboard/${path}`}>
              <button
                className={`${
                  pathname === `${path}` && "bg-gray-200 dark:bg-gray-700"
                } flex items-center rounded-md ${
                  !active && "mx-auto"
                } py-2 px-3`}
              >
                <IconsXs Icon={icon} />
                {active && <h1 className="hidden md:block pl-3">{title}</h1>}
              </button>
            </Link>
          )).slice(0, 3)}
          <div className="mt-2">{active && <h1>Menu</h1>}</div>
          {SidebarData.map(({ title, icon, path }, i) => (
            <Link key={i} href={`/dashboard/${path}`}>
              <button
                className={`${
                  pathname === `${path}` && "bg-gray-200 dark:bg-gray-700"
                } flex items-center rounded-md ${
                  !active && "mx-auto"
                } py-2 px-3`}
              >
                <IconsXs Icon={icon} />
                {active && <h1 className="hidden md:block pl-3">{title}</h1>}
              </button>
            </Link>
          )).slice(3, 7)}

          <div className="mt-2">{active && <h1>Notificiaciones</h1>}</div>
          {SidebarData.map(({ title, icon, path }, i) => (
            <Link key={i} href={`/dashboard/${path}`}>
              <button
                className={`${
                  pathname === `${path}` && "bg-gray-200 dark:bg-gray-700"
                } flex items-center rounded-md ${
                  !active && "mx-auto"
                } py-2 px-3`}
              >
                <IconsXs Icon={icon} />
                {active && <h1 className="hidden md:block pl-3">{title}</h1>}
              </button>
            </Link>
          )).slice(7, 10)}
        </div>
      </div>
    </main>
  )
}
