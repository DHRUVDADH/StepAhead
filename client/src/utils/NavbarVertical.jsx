import React from "react";
import axios from "axios";
import { useAuth } from "@/ProtectedRoutes/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import charusatLogo from "../assets/charusat_logo.png";

const NavbarVertical = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.BACKEND_BASEURL}/api/v1/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            withCredentials: true,
          },
        }
      );
      toast.success("Logout successful!");
      logout();
      console.log(localStorage.getItem("accessToken"))
      navigate("/");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-start pt-4 bg-custom-primary-color/50">
      <div className="h-fit w-fit mb-8">
        <img className="h-7 w-fit bg-white" src={charusatLogo} />
      </div>
      <div className="h-fit w-[160px] flex flex-col gap-4 mb-[300px] ">
        <div className="flex gap-2">
          <span className="w-6">
            <i class="fa-solid fa-house"></i>
          </span>
          Home
        </div>
        <div className="flex gap-2">
          <span className="w-6">
            <i class="fas fa-th-large"></i>
          </span>
          Dashboard
        </div>

        <div className="flex gap-2">
          <span className="w-6">
            <i class="fa-regular fa-comment-dots"></i>
          </span>
          Inbox
        </div>

        <div className="flex gap-2">
          <span className="w-6">
            <i class="fa-solid fa-video"></i>
          </span>
          Mock Interview
        </div>
        <div className="flex gap-2">
          <span className="w-6">
            <i class="fa-solid fa-book-bookmark"></i>
          </span>
          Course
        </div>
        <div className="flex gap-2">
          <span className="w-6">
            <i class="fa-solid fa-hard-drive"></i>
          </span>
          Drives
        </div>
      </div>
      <div className="w-[160px] h-fit flex flex-col gap-4">
        <div className="flex gap-2">
          <span className="w-6">
            <i class="fa-solid fa-gear"></i>
          </span>
          Settings
        </div>
        <div className="flex gap-2">
          <span className="w-6 flex justify-start items-center">
            {/* <div className="border-black border-[1px] w-fit h-fit px-1 rounded-full text-xs">
              
            </div> */}
            <i class="fa-solid fa-question"></i>
          </span>
          Help
        </div>
        <button onClick={(e) => handleLogout(e)} className="flex gap-2">
          <span className="w-6">
            <i class="fa-solid fa-right-from-bracket"></i>
          </span>
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavbarVertical;
