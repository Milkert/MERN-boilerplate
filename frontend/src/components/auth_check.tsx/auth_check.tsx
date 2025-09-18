import { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/check-auth", { withCredentials: true });
        setIsAuthenticated(true);
        console.log(isAuthenticated);
      } catch (err) {
        console.log("ERROR");
      }
    };
    checkAuth();
  }, []);
  if (isAuthenticated === null) {
    // still checking auth
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) {
    console.log(isAuthenticated);
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
