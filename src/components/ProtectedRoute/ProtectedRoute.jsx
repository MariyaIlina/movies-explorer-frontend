import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, isLoggedIn, ...props }) => {
  //   const navigate=useNavigate();
  //   if (isLoggedIn){
  //     return(<Component  { ...props} />)

  //   }  else{
  //       navigate("/")
  //     }
  // useEffect(() => {

  // }, [])

  return isLoggedIn ? (
    <Component {...props} isLoggedIn={isLoggedIn} />
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
