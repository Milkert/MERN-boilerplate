import api from "../config/api";
import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "./UserContext";
import type { User } from "./UserContext";

function ProtectedRoute() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const res = await api.get("/check-auth"); // backend returns user if logged in
      return res;
    },
    retry: false,
  });

  if (isLoading) return <div>Checking authentication...</div>;

  if (error) return <Navigate to="/login" replace />;

  const user: User = data?.data.user;

  return (
    <UserContext.Provider value={user}>
      <Outlet />
    </UserContext.Provider>
  );
}

export default ProtectedRoute;
