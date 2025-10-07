import MainLayout from "../../layouts/MainLayout";
import Home from "../../pages/Home";
import Services from "../../pages/Services";
import About from "../../pages/About";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import Dashboard from "../../pages/Dashboard";
import NotFound from "../../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";

import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Unprotected routes */}
        <Route index element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
