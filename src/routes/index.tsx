import { Routes as RoutesDomen, Route } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import { useAuthStore } from "../store/authStore";
import { PrivateRoute } from "./PrivateRoute";
import { AdminDashboard } from "../pages/Admin/AdminDashboard";
import { AdminCategories } from "../pages/Admin/AdminCategories";

const Routes = () => {
  const { isAuthenticated } = useAuthStore();

  const adminNavItems = [
    { id: "dashboard", label: "Dashboard", element: <AdminDashboard /> },
    { id: "products", label: "Produtos", element: <div>Produtos</div> },
    { id: "categories", label: "Categorias", element: <AdminCategories /> },
    { id: "reports", label: "Relatórios", element: <div>Relatórios</div> },
  ];
  return (
    <>
      <RoutesDomen>
        <Route path="/*" element={<PublicRoutes />} />

        {/* Rotas privadas */}
        <Route
          path="/admin/*"
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
        >
          {adminNavItems.map((item) => (
            <Route key={item.id} path={item.id} element={item.element} />
          ))}
        </Route>
      </RoutesDomen>
    </>
  );
};

export default Routes;
