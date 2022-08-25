import React from "react";
import {
  AccountBox,
  Menu,
  LogoutOutlined,
  AccountCircle,
  ExpandCircleDown,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  let user_details = JSON.parse(localStorage.getItem("login_info"));
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("login_info");
    navigate("/login");
    window.location.reload();
  };
  return (
    <nav className="navbar navbar-expand navbar-light navbar-bg">
      <div className="sidebar-toggle js-sidebar-toggle d-inline-block d-lg-none mb-2">
        <Menu
          sx={{
            color: "black",
            fontSize: "40px",
          }}
        />
      </div>
      <div className="navbar-collapse collapse">
        <ul className="navbar-nav navbar-align">
          <li className="nav-item dropdown">
            <div
              className="dropdown-toggle d-inline-block d-sm-none"
              data-bs-toggle="dropdown"
              style={{ cursor: "pointer" }}
            >
              <AccountCircle
                sx={{
                  color: "black",
                  fontSize: "40px",
                }}
              />
              <ExpandCircleDown
                sx={{
                  color: "black",

                  marginRight: "15px",
                }}
              />
            </div>

            <div
              className="nav-link  d-none d-sm-inline-block"
              data-bs-toggle="dropdown"
              style={{ cursor: "pointer" }}
            >
              <AccountBox sx={{ fontSize: "40px" }} />
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  textAlign: "center",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                {user_details.userInfo.TSM_Name}
              </span>
              <ExpandCircleDown />
            </div>
            <div className="dropdown-menu dropdown-menu-end">
              <div
                className="dropdown-item"
                style={{ cursor: "pointer" }}
                onClick={handleLogout}
              >
                <LogoutOutlined sx={{ marginRight: 3 }} />
                Log out
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
