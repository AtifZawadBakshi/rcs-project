import React from "react";
import {
  AccountBox,
  Menu,
  LogoutOutlined,
  PersonOutlineOutlined,
  AccountCircle,
  SettingsSuggestOutlined,
  ExpandCircleDown,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Login from "../pages/Login";
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
                {user_details.userInfo.User_ID}
              </span>
              <ExpandCircleDown />
            </div>
            <div className="dropdown-menu dropdown-menu-end">
              {/* <Link className="dropdown-item" to="/profile">
                <PersonOutlineOutlined sx={{ marginRight: 3 }} />
                Profile
              </Link>

              <Link className="dropdown-item" to="/settings">
                <SettingsSuggestOutlined sx={{ marginRight: 3 }} />
                Settings
              </Link>
              <div className="dropdown-divider" /> */}

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
