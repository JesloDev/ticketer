import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const ProtectedRoute = ({ allowedRoles, redirectOnDeny = false, children }) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(user?.role)) {
    return redirectOnDeny ? (
      <Navigate to="/" replace />
    ) : (
      <div className="p-8 text-center text-red-500 text-lg">
        You do not have access to this page.
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
