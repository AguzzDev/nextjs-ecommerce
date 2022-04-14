import { parseCookies, setCookie } from "nookies"
import { useEffect } from "react"
import { useState } from "react"
import DarkmodeContext from "./DarkmodeContext"

const DarkmodeProvider = ({ children }) => {
  const [dark, setDark] = useState(true)
  const { colorTheme } = parseCookies()

  const toogleDarkMode = () => {
    setDark(!dark)

    if (dark) {
      setCookie(null, "colorTheme", "dark", { path: "/dashboard" })
      document.documentElement.classList.add("dark")
    } else {
      setCookie(null, "colorTheme", "light", { path: "/dashboard" })
      document.documentElement.classList.remove("dark")
    }
  }

  useEffect(() => {
    if (colorTheme === "dark") {
      setCookie(null, "colorTheme", "dark", { path: "/dashboard" })
      document.documentElement.classList.add("dark")
    } else {
      setCookie(null, "colorTheme", "light", { path: "/dashboard" })
      document.documentElement.classList.remove("dark")
    }
  }, [])

  return (
    <DarkmodeContext.Provider value={{ toogleDarkMode, dark }}>
      {children}
    </DarkmodeContext.Provider>
  )
}

export default DarkmodeProvider
