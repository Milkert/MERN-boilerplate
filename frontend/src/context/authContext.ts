import { createContext, useContext } from "react";

export type User = {
  name: string;
  email: string;
};

export const AuthContext = createContext<User | null>(null);

// useUser() returns the user data if the current user have any
// If the user is logged in you will get the User object with all the fields filled
// If the user is not logged in this will return null
export const useUser = () => useContext(AuthContext);
