import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const ProtectedRoute = ({ allowedRoles, redirectOnDeny = false, children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

  const queryParams = new URLSearchParams(location.search);
  const next = queryParams.get("next") || location.pathname;

  useEffect(() => {
    if (!isAuthenticated) return navigate(`/login?next=${next}`);
  }, [isAuthenticated, next, navigate]);

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
