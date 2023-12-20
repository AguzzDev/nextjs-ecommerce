import { UserInterface } from "interfaces";
import { Dispatch, SetStateAction, createContext } from "react";

interface UserContextInterface {
  user: UserInterface | null;
  loading: boolean;
}

const UserContext = createContext<UserContextInterface>({
  user: null,
  loading: true,
});

export default UserContext;
