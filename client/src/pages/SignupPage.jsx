import React, { useState } from "react";
import loginImage from "../assets/login_image.avif";
import charusatLogo from "../assets/charusat_logo.png";
import dropdownArrow from "../assets/dropdown_arrow.svg";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  // const [isSignUp, setIsSignUp] = useState(true);

  const [isEyeOpen, setIsEyeOpen] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const userData = {
      firstname: fname.toLowerCase(),
      lastname: lname.toLowerCase(),
      email,
      password,
      userRole: userRole.toLowerCase(),
    };
    console.log("Signup Request Data:", userData);

    try {
      const response = await axios.post(
        `${import.meta.env.BACKEND_BASEURL}/api/v1/users/signup`,
        userData
      );

      console.log(response);
      toast.success("Signup successful! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error(
        "Signup failed:",
        error.response?.data?.error || error.message
      );
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center mx-14">
      <div className="w-[750px] flex flex-col justify-center items-center gap-2 px-8">
        <div className="h-10 w-fit bg-white p-2 rounded-md">
          <img className="h-full " src={charusatLogo} alt="" />
        </div>
        <div className="flex flex-col justify-center items-center mt-5 gap-1">
          <div className="text-2xl font-bold tracking-tight text-custom-primary-color">
            Join for Success!
          </div>
          <div className="font-medium text-center text-sm">
            Begin Your Journey Towards Personal and Professional Excellence{" "}
            <br />
            Together with us!
          </div>
        </div>
        <form
          onSubmit={handleSignUp}
          className="mt-10 grid grid-cols-2 w-[660px] gap-x-[20px] gap-y-[12px]"
        >
          <div className="flex flex-col gap-1 w-[320px]">
            <label className="text-sm font-bold" htmlFor="firstname">
              First Name
            </label>
            <input
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              className="w-full border-custom-text-color border-[1px] rounded-[4px] text-sm bg-transparent py-2 pl-3 placeholder:text-custom-text-color/50"
              type="text"
              id="firstname"
              placeholder="Enter your firstname"
            />
          </div>

          <div className="flex flex-col gap-1 w-[320px]">
            <label className="text-sm font-bold" htmlFor="lastname">
              Last Name
            </label>
            <input
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              className="w-full border-custom-text-color border-[1px] rounded-[4px] text-sm bg-transparent py-2 pl-3 placeholder:text-custom-text-color/50"
              type="text"
              id="lastname"
              placeholder="Enter your lastname"
            />
          </div>

          <div className="flex flex-col gap-1 w-full col-span-2">
            <label className="text-sm font-bold" htmlFor="email">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-custom-text-color border-[1px] rounded-[4px] text-sm bg-transparent py-2 pl-3 placeholder:text-custom-text-color/50"
              type="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col gap-1 w-full col-span-2 relative">
            <label className="text-sm font-bold" htmlFor="password">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-custom-text-color border-[1px] rounded-[4px] text-sm bg-transparent py-2 pl-3 placeholder:text-custom-text-color/50"
              type={`${isEyeOpen ? "text" : "password"}`}
              id="password"
              placeholder="Enter your password"
            />
            <div
              onClick={() => setIsEyeOpen(!isEyeOpen)}
              className="absolute top-[34px] right-3 text-custom-text-color flex items-center cursor-pointer"
            >
              {isEyeOpen ? (
                <i className="fa-solid fa-eye"></i>
              ) : (
                <i className="fa-solid fa-eye-slash"></i>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1 relative w-full col-span-2">
            <label className="text-sm font-bold" htmlFor="userRole">
              User Role
            </label>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="w-full border-custom-text-color border-[1px] rounded-[4px] text-sm bg-transparent py-2 pl-3 appearance-none"
              id="userRole"
            >
              <option value="">Select a role</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
              <option value="company">Company</option>
            </select>
            <div className="absolute top-8 right-2 flex items-center pointer-events-none">
              <img src={dropdownArrow} className="h-6" alt="" />
            </div>
          </div>

          <div className="mt-5 w-full col-span-2 flex flex-col gap-2 justify-center items-center">
            <button
              className="w-full flex justify-center items-center py-2 rounded-md bg-custom-primary-color text-custom-bg"
              type="submit"
            >
              Sign Up
            </button>
            <div className="w-full col-span-2 text-center">
              Already have an account?{" "}
              <span className="text-custom-primary-color font-extrabold">
                Login
              </span>
            </div>
          </div>
        </form>
      </div>
      <div className="h-[500px] w-[700px]">
        <img
          className="h-full object-cover rounded-xl"
          src={loginImage}
          alt=""
        />
      </div>
    </div>
  );
};

export default SignupPage;
