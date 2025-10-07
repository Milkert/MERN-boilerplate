import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AuthContext, type User } from "../../context/authContext";

import api from "../../config/api";

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

  const user: User = data?.data.user;

  return (
    <AuthContext.Provider value={user}>
      <Outlet />
    </AuthContext.Provider>
  );
}

export default ProtectedRoute;
