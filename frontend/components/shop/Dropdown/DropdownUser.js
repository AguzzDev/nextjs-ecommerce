import { Popover } from "@headlessui/react"
import { UserIcon } from "@heroicons/react/outline"
import { useDispatch } from "react-redux"

import { userLogout } from "store/actions/auth"
import { IconXS } from "../Icons"

export const DropdownUser = ({ user }) => {
  const dispatch = useDispatch()

  return (
    <Popover className="relative flex items-center">
      <Popover.Button>
        <IconXS Icon={UserIcon} />
      </Popover.Button>

      <Popover.Panel
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        className="absolute top-7 left-[2px] bg-black bg-opacity-80 w-4 h-3"
      ></Popover.Panel>

      <Popover.Panel className="absolute z-10 w-32 p-3 mt-2 text-center text-white bg-black rounded-xl top-8 -left-20 bg-opacity-80">
        <h2 className="text-center">{user.username}</h2>
        <button className="mt-3" onClick={() => dispatch(userLogout())}>
          Cerrar Sesión
        </button>
      </Popover.Panel>
    </Popover>
  )
}
