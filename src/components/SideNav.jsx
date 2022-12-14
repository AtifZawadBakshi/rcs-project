import { DashboardCustomizeOutlined, ViewList } from "@mui/icons-material";
import React from "react";
import { Link, NavLink } from "react-router-dom";
const SideNav = () => {
  let user_details = JSON.parse(localStorage.getItem("login_info"));
  let activeStyle = {
    background:
      "linear-gradient(90deg,rgba(59,125,221,.1),rgba(59,125,221,.0875) 50%,transparent)",
    borderLeftColor: "#3b7ddd",
    color: "#e9ecef",
  };

  return (
    <nav
      className="sidebar js-sidebar"
      style={{
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <div className="sidebar-content js-simplebar">
        <Link
          className="sidebar-brand"
          to="/"
          style={{ textDecoration: "none" }}
        >
          <span
            className="align-middle"
            style={{ fontWeight: "bold", fontSize: "25px" }}
          >
            RCS: CE MARKET
          </span>
        </Link>
        <ul className="sidebar-nav">
          <li className="sidebar-item">
            <NavLink
              className="sidebar-link"
              to="/cencus-datalist"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <ViewList />
              <span className="align-middle">Census Data List</span>
            </NavLink>
          </li>

          {user_details.isAdmin === false && (
            <li className="sidebar-item">
              <NavLink
                className="sidebar-link"
                to="/"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <DashboardCustomizeOutlined />
                <span className="align-middle">RCS</span>
              </NavLink>
            </li>
          )}

          {/* <li className="sidebar-item">
            <NavLink
              className="sidebar-link"
              to="/test"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <TextSnippet />
              <span className="align-middle">Test</span>
            </NavLink>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default SideNav;
