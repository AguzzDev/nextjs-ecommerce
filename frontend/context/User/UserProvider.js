import UserContext from "./UserContext"
import { useEffect, useState } from "react"
import { parseCookies } from "nookies"

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState("")
  const [user, setUser] = useState("")

  useEffect(() => {
    if (window !== "undefined") {
      const profile = JSON.parse(localStorage.getItem("profile"))

      if (profile) {
        setUser(profile)
        setUserId(profile._id)
      } else {
        setUser(false)
        setUserId(false)
      }
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, userId }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
