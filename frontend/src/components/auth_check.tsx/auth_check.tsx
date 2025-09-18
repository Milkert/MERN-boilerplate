import api from "../../config/api";
import { Navigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const { isLoading, error, data } = useQuery({
    queryKey: ["auth"],

    queryFn: async () => {
      const res = await api.get("/check-auth"); // backend returns user if logged in
      return res;
    },
  });
  console.log(data?.data["email"]);

  if (isLoading) return <div>Checking authentication...</div>;

  if (error) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
