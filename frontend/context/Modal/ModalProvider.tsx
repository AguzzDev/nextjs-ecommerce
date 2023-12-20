import { ChildrenType } from "interfaces";
import ModalContext from "./ModalContext";
import { useContext, useState } from "react";

const ModalProvider: React.FC<{ children: ChildrenType }> = ({ children }) => {
  let [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
export default ModalProvider;
