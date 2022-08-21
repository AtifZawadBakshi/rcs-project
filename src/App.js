import { BrowserRouter, Route, useHistory } from "react-router-dom";
import AppNavigation from "./components/AppNavigation";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import ScrollTop from "./components/ScrollTop";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import { useNavigate } from "react-router-dom";
function App() {
  // const user_details = localStorage.getItem("login_info");
  // const user = user_details.userInfo;
  // console.log(user_details);

  // if (user_details != null) {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <SideNav />
        <div className="main">
          <Header />
          <AppNavigation />
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
  // } else {
  //   return (
  //     <BrowserRouter>
  //       <AppNavigation />
  //     </BrowserRouter>
  //   );
  // }
}

export default App;
