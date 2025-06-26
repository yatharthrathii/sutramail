import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const email = useSelector((state) => state.user.email);
  return email ? <Navigate to="/mailbox" replace /> : children;
};

export default PublicRoute;
