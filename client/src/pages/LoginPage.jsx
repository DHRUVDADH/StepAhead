import React, { useState } from "react";
import signupImage from "../assets/sigup_image.jpg";
import charusatLogo from "../assets/charusat_logo.png";
import googleIcon from "../assets/google_icon.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../ProtectedRoutes/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEyeOpen, setIsEyeOpen] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        userData,
        {
          "Content-Type": "application/json",
        }
      );

      toast.success("Logged In Successfully");
      login(response.data.message.accessToken  ,response.data.message.user);
      navigate("/enterProfileInformation");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.error || error.message
      );
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center mx-14">
      <div className="w-[750px] min-h-[700px] flex flex-col justify-start items-center gap-2 px-8 pt-16">
        <div className="h-10 w-fit bg-white p-2 rounded-md">
          <img className="h-full " src={charusatLogo} alt="" />
        </div>
        <div className="flex flex-col justify-center items-center mt-5 gap-1">
          <div className="text-2xl font-bold tracking-tight text-custom-primary-color">
            Welcome Back!
          </div>
          <div className="font-medium text-center text-sm">
            Welcome Back! Embark on a journey of Knowledge and Growth.
            <br />
            Ready To Continue?
          </div>
        </div>
        <form
          onSubmit={handleSignIn}
          className="mt-5 flex flex-col w-[530px] gap-3"
        >
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
              class="absolute top-[34px] right-3 text-custom-text-color flex items-center cursor-pointer"
            >
              {isEyeOpen ? (
                <i class="fa-solid fa-eye"></i>
              ) : (
                <i class="fa-solid fa-eye-slash"></i>
              )}
            </div>
          </div>
          <button
            className="mt-2 w-full flex justify-center items-center py-2 rounded-md bg-custom-primary-color text-custom-bg"
            type="submit"
          >
            Log In
          </button>
        </form>
        <div className="flex justify-center items-center gap-3 mt-32">
          <div className="h-[2px] w-[240px] bg-custom-gray/50"></div>
          <div className="text-xs">OR</div>
          <div className="h-[2px] w-[240px] bg-custom-gray/60"></div>
        </div>
        <div className="w-[500px] h-fit flex items-center justify-center gap-4 border-custom-text-color/50 border-[1px] py-2 rounded-md">
          <div className="h-fit w-fit">
            <img className="h-8" src={googleIcon} alt="" />
          </div>
          <div>Continue With Google</div>
        </div>
        <div className="w-full col-span-2 text-center">
          Don't have an account?{" "}
          <span className="text-custom-primary-color font-extrabold">
            Signup
          </span>
        </div>
      </div>
      <div className="h-[700px] w-[700px]">
        <img
          className="h-full object-cover rounded-xl"
          src={signupImage}
          alt=""
        />
      </div>
    </div>
  );
};

export default LoginPage;
