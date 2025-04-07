// ProtectedRoute.js
import { useAuth } from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // If user is not logged in, redirect to login page
  if (loading) {
    return <div>Loading...</div>; // you can also show a loader component
  }
  if (!user) {
    return <Navigate to="/error" replace />;
  }

  // If authorized, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
