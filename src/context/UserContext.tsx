import React, { createContext, useState, useContext } from "react";
import { users } from "../data/Users";

export type User = (typeof users)[number];

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

const defaultUser = users[0];

export const UserContext = createContext<UserContextType>({
  user: defaultUser,
  setUser: () => {},
});

export const UserProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(defaultUser);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
