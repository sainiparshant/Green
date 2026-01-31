import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const { isAuth, loading, user } = useSelector((state) => state.auth);
  

  if (loading) return null;

  if (!isAuth) {
    return (
      <Navigate
        to={role === "admin" ? "/admin/login" : "/login"}
        replace
      />
    );
  }

  if (role && user?.role !== role) {
    return (
      <Navigate
        to={user?.role === "admin" ? "/admin/dashboard" : "/"}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
