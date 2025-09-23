import { UserContext } from "./userContext";
import { type UserType } from "../types/user";

import api from "../config/api";

import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function ProtectedRoute() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const res = await api.get("/auth"); // backend returns user if logged in

      return res;
    },
    retry: false,
  });

  if (isLoading) return <div>Checking authentication...</div>;

  if (error) return <Navigate to="/login" replace />;

  const user: UserType = data?.data.user;

  return (
    <UserContext.Provider value={user}>
      <Outlet />
    </UserContext.Provider>
  );
}

export default ProtectedRoute;
