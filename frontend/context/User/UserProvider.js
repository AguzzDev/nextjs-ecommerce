import UserContext from "./UserContext"
import { useEffect, useState } from "react"
import { parseCookies } from "nookies"

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState("")
  const [user, setUser] = useState("")

  const { profile } = parseCookies()

  useEffect(() => {
    if (profile) {
      setUser(JSON.parse(profile))
      setUserId(JSON.parse(profile)._id)
    } else {
      setUser(false)
      setUserId(false)
    }
  }, [profile])

  return (
    <UserContext.Provider value={{ user, userId }}>
      {children}
    </UserContext.Provider>
  )
}
