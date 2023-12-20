import { Dispatch, SetStateAction, createContext } from "react";

interface ModalContextInterface {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextInterface>({
  isOpen: false,
  setIsOpen: () => {},
  openModal: () => {},
  closeModal: () => {},
});

export default ModalContext;
