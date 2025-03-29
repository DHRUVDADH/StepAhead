import React from "react";
// import { Link } from 'react-router-dom'
import charusatLogo from "../assets/charusat_logo.png";
import homepageImage from "../assets/homepage.avif";

const HomePage = () => {
  return (
    <section className="w-screen min-h-screen">
      <div className="h-fit w-full flex flex-col gap-2">
        <div className="flex justify-between items-center px-10 py-5 mt-2">
          <div className="h-fit w-fit p-2 bg-white rounded-lg">
            <img className="h-10" src={charusatLogo} />
          </div>
          <div className="flex justify-center items-center">
            <div className="mr-12 w-fit h-fit">Home</div>
            <div className="mr-12 w-fit h-fit">About Us</div>
            <div className="mr-12 w-fit h-fit">More</div>
            <div className="mr-12 w-fit h-fit">Contact Us</div>
            <button className="h-fit w-fit px-8 py-3 rounded-lg bg-white text-custom-primary-color font-bold mr-4">
              Login
            </button>
            <button className="h-fit w-fit px-8 py-3 rounded-lg bg-custom-primary-color">
              Signup
            </button>
          </div>
        </div>

        <div className="relative h-[650px] overflow-y-hidden w-full">
          <img
            className="absolute top-[-30px] left-0 w-full opacity-50"
            src={homepageImage}
            alt=""
          />
          <div className="relative h-full flex flex-col justify-end pb-20 pl-10 left-0 z-10 w-fit">
            <div className="text-5xl font-extrabold mb-4">Experience placements<br/>like never before</div>
            <div className="text-xl font-medium mb-4">
              Empower students and streamline placement<br/>processes with a single
              platform that supports skills and<br/>growth and monitors performance
              seamlessly.
            </div>
            <div className="flex justify-start items-center gap-2">
              <button className="h-fit w-fit px-8 py-3 rounded-sm bg-white text-custom-primary-color font-bold">Get Started</button>
              <button className="h-fit w-fit px-8 py-3 rounded-sm bg-custom-primary-color">Learn More</button>
            </div>
          </div>  
        </div>
      </div>
    </section>
  );
};

export default HomePage;
