import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, isLoggedIn, ...props }) => {
 
  return isLoggedIn ? (
    <Component {...props} isLoggedIn={isLoggedIn} />
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
