import React from "react";
import NavbarVertical from "@/utils/NavbarVertical.jsx";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Profile from "./Profile.jsx";
import { Outlet } from "react-router-dom";

const Home2 = () => {
  return (
    <div className="flex">
      <div className="w-56 fixed">
        <NavbarVertical />
      </div>

      <div className="absolute left-72 mt-5">
        <Outlet /> {/* ✅ This will render nested routes */}
      </div>
    </div>
  );
};

export default Home2;
