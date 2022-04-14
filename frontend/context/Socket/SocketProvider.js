import SocketContext from "./SocketContext"
import { io } from "socket.io-client"
import { API_URL_BASE } from "utils/urls"

const SocketProvider = ({ children }) => {
  const socket = io(API_URL_BASE)

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
