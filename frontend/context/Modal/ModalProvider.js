import ModalContext from "./ModalContext"
import { useState } from "react"

export const ModalProvider = ({ children }) => {
  let [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }
  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  )
}
