import { Copyright } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row text-muted">
          <div className="col-6 text-start">
            <p className="mb-0">
              <Copyright />
              <Link
                className="text-muted"
                to=""
                style={{ textDecoration: "none" }}
              >
                <strong>FAIR ELECTRONICS LTD</strong>
              </Link>
            </p>
          </div>
          <div className="col-6 text-end">
            <ul className="list-inline">
              <li className="list-inline-item">
                <Link className="text-muted" to="">
                  Support
                </Link>
              </li>
              <li className="list-inline-item">
                <Link className="text-muted" to="">
                  Help Center
                </Link>
              </li>
              <li className="list-inline-item">
                <Link className="text-muted" to="">
                  Privacy
                </Link>
              </li>
              <li className="list-inline-item">
                <Link className="text-muted" to="">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
