import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/authContext.tsx";
import { useEffect } from "react";
import { type User } from "../../types/userType";

import api from "../../config/api";

function ProtectedRoute() {
  const { setUser } = useAuth();

  const { isLoading, error, data } = useQuery({
    queryKey: ["auth-status"],
    queryFn: async () => {
      const res = await api.get("/auth-status"); // backend returns user if logged in

      return res;
    },
    retry: false,
  });

  // Update global auth state when user data is fetched
  useEffect(() => {
    if (data?.data.user) {
      setUser(data.data.user as User);
    }
  }, [data, setUser]);

  if (isLoading) return <div>Checking authentication...</div>;

  if (error) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
