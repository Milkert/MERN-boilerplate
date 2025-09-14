import { Outlet } from "react-router-dom";
import Navbar from "../components/nav/Navbar";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Navbar />
      <main>
        <Outlet /> {/* child route content goes here */}
      </main>
    </div>
  );
};

export default MainLayout;
