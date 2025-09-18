import { useEffect, useState, type JSX } from "react";
import api from "../../config/api";
// import { Navigate } from "react-router-dom";
// import axios from "axios";

import { useQuery } from "@tanstack/react-query";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const { isLoading, isPending, error, data } = useQuery({
    queryKey: ["auth"],

    queryFn: async () => {
      const res = await api.get("/check-auth"); // backend returns user if logged in
      return res;
    },
  });

  if (isLoading) return <div>Checking authentication...</div>;

  if (error) {
    console.log("ERROR: " + error.message);
    return <div>Error has occured</div>;
  }

  console.log(data);

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const res = await axios.get("/api/check-auth", { withCredentials: true });
  //       setIsAuthenticated(true);
  //       console.log(isAuthenticated);
  //     } catch (err) {
  //       console.log("ERROR");
  //     }
  //   };
  //   checkAuth();
  // }, []);
  // if (isAuthenticated === null) {
  //   // still checking auth
  //   return <div>Loading...</div>;
  // }
  // if (!isAuthenticated) {
  //   console.log(isAuthenticated);
  //   return <Navigate to="/login" replace />;
  // }
  return children;
}

export default ProtectedRoute;
