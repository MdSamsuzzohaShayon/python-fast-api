import { useLocation, Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  let location = useLocation();

  const token = localStorage.getItem('token');
  if (!token) {
    // CONTINUE WITH LOGIN PAGE 
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}


export default RequireAuth;