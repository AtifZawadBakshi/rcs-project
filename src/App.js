import { BrowserRouter, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import { Routes } from "react-router-dom";
import PrivateRoutes from "./Auth/PrivateRoutes";
import Dashboard from "./pages/Dashboard";
import CencusDataList from "./pages/CencusDataList";
import CencusData from "./pages/CencusData";
function App() {
  let user_details = JSON.parse(localStorage.getItem("login_info")) || null;
  let isLoggedIn = false;
  if (user_details != null) {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }
  if (user_details != null) {
    return (
      <BrowserRouter>
        <div className="wrapper">
          <SideNav />
          <div className="main">
            <Header />
            <Routes>
              <Route element={<PrivateRoutes isLoggedIn={isLoggedIn} />}>
                <Route
                  path="/"
                  element={
                    user_details.isAdmin === false ? (
                      <Dashboard />
                    ) : (
                      <CencusDataList />
                    )
                  }
                  exact
                />
                <Route path="cencus-datalist" element={<CencusDataList />} />
                {user_details.isAdmin === true && (
                  <Route
                    path="cencus-datalist/:cencusID"
                    element={<CencusData />}
                  />
                )}
              </Route>
            </Routes>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes isLoggedIn={isLoggedIn} />}>
            <Route path="/" element={<Dashboard />} exact />
            <Route path="cencus-datalist" element={<CencusDataList />} />
            <Route path="cencus-datalist/:cencusID" element={<CencusData />} />
          </Route>
          <Route element={<Login />} path="/login" />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
