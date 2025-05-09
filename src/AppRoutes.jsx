import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";
// import AboutUs from "./pages/AboutUs";
// import ContactUs from "./pages/ContactUs";
import Properties from "./pages/Properties";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";

const AnimatedRoutes = () => {
  const location = useLocation(); // Track route changes

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        
        <Route path="/register" element={<Register />} />
        <Route path="/aboutus" element={<PageNotFound />} />
        <Route path="/contactus" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
};

export default AppRoutes;
