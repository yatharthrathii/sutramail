import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const email = useSelector((state) => state.user.email);
  return email ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
