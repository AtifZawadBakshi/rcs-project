import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import CencusDataList from "../pages/CencusDataList";
import Test from "../pages/Test";
import Logout from "./Logout";
import Login from "../pages/Login";
import RequireAuth from "../Auth/RequireAuth";
const AppNavigation = () => {
  let user_details = JSON.parse(localStorage.getItem("user_info"));
  // const user = user_details.userInfo;
  let isLoggedIn = false;
  if (user_details && user_details != null) {
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
          <Route path="cencusdata-list" element={<CencusDataList />} />
          <Route path="test" element={<Test />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes> */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="cencusdata-list" element={<CencusDataList />} />
        <Route path="test" element={<Test />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
      </Routes>
    </>
  );
};

export default AppNavigation;
