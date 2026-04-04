import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("galaxyAdminToken");
  return token ? children : <Navigate to="/admin/login" replace />;
}
