import { Navigate } from "react-router-dom";
import Login from "../pages/Login";

const Logout = () => {
  localStorage.removeItem("login_info");

  return <Navigate to="/login" />;
};

export default Logout;
