import { Outlet } from "react-router-dom";
import Footer from "../pages/Sheared/Footer";
import Navbar from "../pages/Sheared/Navbar/Navbar";

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="container mx-auto">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Main;
