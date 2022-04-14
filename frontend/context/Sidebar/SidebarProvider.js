import { destroyCookie, parseCookies, setCookie } from "nookies"
import { useEffect, useState } from "react"
import SidebarContext from "./SidebarContext"

const SidebarProvider = ({ children }) => {
  const { sidebar } = parseCookies()
  const [active, setActive] = useState(
    sidebar === "true" ? true : sidebar === "false" ? false : false
  )

  const toogleMenu = () => {
    setActive(!active)
  }

  useEffect(() => {
    destroyCookie(null, "sidebar")

    setCookie(null, "sidebar", JSON.stringify(active),{path:"/dashboard"})
  }, [active])

  return (
    <SidebarContext.Provider value={{ active, setActive, toogleMenu }}>
      {children}
    </SidebarContext.Provider>
  )
}

export default SidebarProvider
