import { Routes, Route } from "react-router-dom";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<div>dashboard</div>} />
    </Routes>
  );
};

export default AdminRoutes;
