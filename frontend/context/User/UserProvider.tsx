import { ChildrenType, UserInterface } from "interfaces";
import UserContext from "./UserContext";
import { useEffect, useState } from "react";
import { useContext } from "react";

const UserProvider = ({ children }: { children: ChildrenType }) => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getUser = localStorage.getItem("profile");
      const profile = getUser ? JSON.parse(getUser) : null;

      if (!profile) {
        setUser(null);
        setLoading(false);
        return;
      }

      setUser(profile);
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export default UserProvider;
