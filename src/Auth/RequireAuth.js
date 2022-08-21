import React from "react";
import { Navigate } from "react-router-dom";
const RequireAuth = ({ children }) => {
  let user_details = JSON.parse(localStorage.getItem("user_info"));
  // const user = user_details.userInfo;
  let isLoggedIn = false;
  if (user_details && user_details != null) {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default RequireAuth;
