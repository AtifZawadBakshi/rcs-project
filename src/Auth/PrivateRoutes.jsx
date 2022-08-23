import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = ({ isLoggedIn }) => {
  console.log(isLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
