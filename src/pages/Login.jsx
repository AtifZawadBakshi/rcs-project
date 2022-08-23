import React, { useState } from "react";
import { Form } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import { URL, LOGIN } from "../Axios/Api";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [userName, setUseName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    let userDetails = {
      userID: userName,
      Password: password,
    };
    console.log(userDetails);
    const LoginSubmit = async () => {
      const res = await axios
        .post(URL + LOGIN, userDetails)
        .then((response) => {
          if (response.data.access_token) {
            toast.success("Login has been successfull!", {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            localStorage.setItem("login_info", JSON.stringify(response.data));
            console.log(JSON.parse(localStorage.getItem("login_info")));
            navigate("/");
            window.location.reload();
          }
        })
        .catch((response) => {
          toast.error("Invalid User name or Password!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    };
    LoginSubmit();
  };
  return (
    <main className="d-flex w-100">
      <div className="container d-flex flex-column">
        <div className="row vh-100">
          <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
            <div className="d-table-cell align-middle">
              <div className="text-center mt-4">
                <h1 className="h2">Welcome !</h1>
                <p className="lead">Sign in to your account to continue</p>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="m-sm-4">
                    <div className="text-center">
                      <img
                        src="/img/photos/Fair-Group-Logo.png"
                        alt="Charles Hall"
                        className="img-fluid"
                      />
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <Form.Group
                          className="mb-4"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>
                            <span style={{ fontWeight: "bold" }}>
                              User Name:
                            </span>
                          </Form.Label>
                          <TextField
                            required={true}
                            fullWidth
                            type="text"
                            className="mt-2"
                            label="Enter user name"
                            value={userName}
                            onChange={(e) => setUseName(e.target.value)}
                          />
                        </Form.Group>
                      </div>
                      <div className="mb-3">
                        <Form.Group
                          className="mb-4"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>
                            <span style={{ fontWeight: "bold" }}>
                              Password:
                            </span>
                          </Form.Label>
                          <TextField
                            required={true}
                            fullWidth
                            type="password"
                            className="mt-2"
                            label="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </Form.Group>
                      </div>

                      <div className="text-center mt-3">
                        <button className="btn btn-lg btn-primary">
                          Sign in
                        </button>
                        <ToastContainer />
                        {/* <button type="submit" className="btn btn-lg btn-primary">Sign in</button> */}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
