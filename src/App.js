import { BrowserRouter, Route } from "react-router-dom";
// import AppNavigation from "./components/AppNavigation";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import { Routes } from "react-router-dom";
import PrivateRoutes from "./Auth/PrivateRoutes";
import Dashboard from "./pages/Dashboard";
import CencusDataList from "./pages/CencusDataList";
function App() {
  let user_details = JSON.parse(localStorage.getItem("login_info"));
  console.log(user_details);
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
                <Route path="/" element={<Dashboard />} exact />
                <Route path="cencusdata-list" element={<CencusDataList />} />
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
            <Route path="cencusdata-list" element={<CencusDataList />} />
          </Route>
          <Route element={<Login />} path="/login" />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
