import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoute from "./routes/PrivateRoute";
import Footer from "./components/Footer";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <Header cartItemsCount={0} />
      <Routes>
        <Route path="/*" element={<PublicRoutes />} />
        <Route
          path="/admin/*"
          element={<PrivateRoute isAuthenticated={true} />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
