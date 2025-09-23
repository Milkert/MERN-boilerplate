import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";

import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Services from "./pages/Services.tsx";

import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Protected from "./pages/Protected.tsx";

import MainLayout from "./layouts/MainLayout.tsx";
import ProtectedRoute from "./context/ProtectedRoute.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/protected" element={<Protected />} />
              <Route path="/about" element={<About />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
