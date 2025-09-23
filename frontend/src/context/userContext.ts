import { createContext, useContext } from "react";
import { type UserType } from "../types/user";

export const UserContext = createContext<UserType | null>(null);

// useUser() returns the user data if the current user have any
// If the user is logged in you will get the User object with all the fields filled
// If the user is not logged in this will return null
export const useUser = () => useContext(UserContext);
