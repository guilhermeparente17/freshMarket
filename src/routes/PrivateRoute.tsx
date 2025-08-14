import { Navigate, Outlet } from "react-router-dom";
import Admin from "../pages/Admin";

const PrivateRoute = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return isAuthenticated ? <Admin /> : <Navigate to="/" />;
};

export default PrivateRoute;
