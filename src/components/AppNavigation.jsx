import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import CencusDataList from "../pages/CencusDataList";
import Test from "../pages/Test";
import Logout from "./Logout";
import Login from "../pages/Login";
import RequireAuth from "../Auth/RequireAuth";
import PrivateRoutes from "../Auth/PrivateRoutes";
const AppNavigation = () => {
  let user_details = JSON.parse(localStorage.getItem("login_info"));
  console.log(user_details);
  let isLoggedIn = false;
  if (user_details != null) {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }

  return (
    <>
      {/* <Routes>
        <Route path="/login" element={isLoggedIn ? <Dashboard /> : <Login />} />
        <Route path="/" element={<RequireAuth />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cencus-datalist" element={<CencusDataList />} />
          <Route path="test" element={<Test />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes> */}
      {/* <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="cencus-datalist" element={<CencusDataList />} />
        <Route path="test" element={<Test />} />
      </Routes> */}
      <Routes>
        <Route element={<PrivateRoutes loginstatus={isLoggedIn} />}>
          <Route path="/" element={<Dashboard />} exact />
          <Route path="cencus-datalist" element={<CencusDataList />} />
          <Route path="test" element={<Test />} />
        </Route>
        <Route element={<Login />} path="/login" />
      </Routes>
    </>
  );
};

export default AppNavigation;
