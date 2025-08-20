import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoute({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
