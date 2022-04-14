import { BellIcon, SunIcon, MoonIcon } from "@heroicons/react/outline"

import { IconsXs } from "components/dashboard/Icons"
import DarkmodeContext from "context/Darkmode/DarkmodeContext"
import { useContext } from "react"

export default function Navbar() {
  const { toogleDarkMode,dark } = useContext(DarkmodeContext)
  return (
    <main className="flex justify-end px-5 py-3 w-full">
      <div className="flex items-center space-x-5">
        <button>
          <IconsXs Icon={BellIcon} props={`dark:text-white text-black`} />
        </button>
        <button onClick={toogleDarkMode}>
          {dark ? <IconsXs Icon={SunIcon} props={`dark:text-white text-black`} /> : <IconsXs Icon={MoonIcon} props={`dark:text-white text-black`} />}
        </button>

        <div className="bg-gray-300 h-10 w-10 rounded-full" />
      </div>
    </main>
  )
}
