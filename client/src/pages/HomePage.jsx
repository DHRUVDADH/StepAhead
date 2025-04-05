import React from "react";
import { useState, useEffect } from "react";
// import { Link } from 'react-router-dom'
import charusatLogo from "../assets/charusat_logo.png";
import homepageImage from "../assets/homepage.avif";
import logo1 from "../assets/logo1_homepage.svg";
import logo2 from "../assets/logo2_homepage.svg";
import logo3 from "../assets/logo3_homepage.svg";
import logo4 from "../assets/logo4_homepage.svg";
import logo5 from "../assets/logo5_homepage.svg";
import logo6 from "../assets/logo6_homepage.svg";
import logo7 from "../assets/logo7_homepage.svg";
import logo8 from "../assets/logo8_homepage.svg";
import logo9 from "../assets/logo9_homepage.svg";
import logo10 from "../assets/logo10_homepage.svg";
import logo11 from "../assets/logo11_homepage.svg";
import logo12 from "../assets/logo12_homepage.svg";
import company1 from "../assets/company1_homepage.svg";
import company2 from "../assets/company2_homepage.svg";
import company3 from "../assets/company3_homepage.svg";
import company4 from "../assets/company4_homepage.svg";
import company5 from "../assets/company5_homepage.svg";
import company6 from "../assets/company6_homepage.svg";
import company7 from "../assets/company7_homepage.svg";
import company8 from "../assets/company8_homepage.svg";
import company9 from "../assets/company9_homepage.svg";
import company10 from "../assets/company10_homepage.svg";
import company11 from "../assets/company11_homepage.svg";
import company12 from "../assets/company12_homepage.svg";
import homepageCircle1 from "../assets/homepage_image_circle1.jpg";
import homepageCircle2 from "../assets/homepage_image_circle2.jpg";
import svg1 from "../assets/homepage_svg1.webp";
import svg2 from "../assets/homepage_svg2.svg";
import instaIcon from "../assets/insta_icon.png";
import mailIcon from "../assets/mail_icon.png";
import linkedInIcon from "../assets/linkedin_icon.png";
import { Link } from "react-router-dom";

const logos = [
  company1,
  company2,
  company3,
  company4,
  company5,
  company6,
  company7,
  company8,
  company9,
  company10,
  company11,
  company12,
];

const HomePage = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const scrollToSection = (elementId) => {
    document.getElementById(elementId).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="w-screen min-h-screen">
      <div className="relative h-fit w-full flex flex-col">
        <div className="absolute w-full flex justify-between items-center px-10 py-5 bg-custom-bg/80  z-10">
          <div className="h-fit w-fit p-2 rounded-lg">
            <img className="h-10" src={charusatLogo} />
          </div>
          <div className="flex justify-center items-center">
            <div
              onClick={() => scrollToSection("home")}
              className="mr-12 w-fit h-fit cursor-pointer"
            >
              Home
            </div>
            <div
              onClick={() => scrollToSection("about")}
              className="mr-12 w-fit h-fit cursor-pointer"
            >
              About Us
            </div>
            <div
              onClick={() => scrollToSection("more")}
              className="mr-12 w-fit h-fit cursor-pointer"
            >
              More
            </div>
            <div
              onClick={() => scrollToSection("contact")}
              className="mr-12 w-fit h-fit cursor-pointer"
            >
              Contact Us
            </div>
            <button
              onClick={() => {
                toggleTheme();
              }}
              className="text-custom-text-color h-10 w-10 rounded-full mr-4 border-custom-text-color border-[1px] transition-all ease-in"
            >
              <i className="fa-solid fa-moon"></i>
            </button>
            <Link
              to="/login"
              className="h-fit w-fit px-8 py-3 rounded-lg bg-white text-custom-primary-color mr-4 cursor-pointer font-extrabold"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="h-fit w-fit px-8 py-3 rounded-lg bg-custom-primary-color cursor-pointer text-white font-bold "
            >
              Signup
            </Link>
          </div>
        </div>

        <div
          id="home"
          className="relative top-0 right-0 h-[750px] overflow-y-hidden w-full"
        >
          <img
            className="absolute top-[-30px] left-0 w-full opacity-80"
            src={homepageImage}
            alt=""
          />
          <div className="relative h-full flex flex-col justify-end pb-20 pl-10 left-0 z-10 w-fit">
            <div className="text-5xl font-extrabold mb-4 ">
              Experience placements
              <br />
              like never before
            </div>
            <div className="text-xl font-medium mb-4">
              Empower students and streamline placement
              <br />
              processes with a single platform that supports skills and
              <br />
              growth and monitors performance seamlessly.
            </div>
            <div className="flex justify-start items-center gap-2">
              <button className="h-fit w-fit px-8 py-3 rounded-sm bg-white text-custom-primary-color font-bold">
                Get Started
              </button>
              <button className="h-fit w-fit px-8 py-3 rounded-sm bg-custom-primary-color">
                Learn More
              </button>
            </div>
          </div>
        </div>

        <div id="about" className="flex justify-around py-5">
          <div className="flex items-center gap-4">
            <div className="h-fit w-fit p-4 rounded-full bg-white shadow-custom-box-shadow">
              <img className="h-10 object-center" src={logo1} alt="" />
            </div>
            <div className="flex flex-col">
              <div className="text-xl font-bold">500+ courses</div>
              <div className="text-custom-primary-color text-xs">
                Crafted for Placement Readiness
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-fit w-fit p-4 rounded-full bg-white shadow-custom-box-shadow">
              <img className="h-10 object-center" src={logo2} alt="" />
            </div>
            <div className="flex flex-col">
              <div className="text-xl font-bold">Unified reporting</div>
              <div className="text-custom-primary-color text-xs">
                Placement insights in one dashboard
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-fit w-fit p-4 rounded-full bg-white shadow-custom-box-shadow">
              <img className="h-10 object-center" src={logo3} alt="" />
            </div>
            <div className="flex flex-col">
              <div className="text-xl font-bold">2500+ assessments</div>
              <div className="text-custom-primary-color text-xs">
                Industry level mock and daily practice
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-fit w-fit p-4 rounded-full bg-white shadow-custom-box-shadow">
              <img className="h-10 object-center" src={logo4} alt="" />
            </div>
            <div className="flex flex-col">
              <div className="text-xl font-bold">AI-Driven technology</div>
              <div className="text-custom-primary-color text-xs">
                AI to boost placement success
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col  gap-10 mt-20">
          <div className="text-3xl text-center leading-loose font-extrabold">
            Trusted by over 100+ companies
            <br />
            and 30,000+ students
          </div>
          <div>
            <div className="relative w-full overflow-hidden py-5 bg-white">
              <div className="flex w-max animate-scroll gap-3">
                {logos.concat(logos).map((logo, index) => (
                  <img
                    key={index}
                    src={logo}
                    alt={`Company ${index}`}
                    className="w-[220px] object-center   bg-white px-7 py-4 rounded-lg h-auto mx-4"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-fit px-20 py-20 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="text-3xl font-extrabold">
              Unlocking Opportunities for all
            </div>
            <div className="text-custom-text-color">
              Empowering learners and institutions with limitless possibilities
              for growth and success.
            </div>
          </div>
          <div className="flex flex-col mt-14 gap-1 relative">
            <div className="absolute top-0 left-[50%] w-[2px] h-full bg-custom-primary-color">
              <div className="absolute top-[25%] left-[-6px] w-[14px] h-[14px] rounded-full bg-custom-primary-color"></div>
              <div className="absolute top-[75%] left-[-6px] w-[14px] h-[14px] rounded-full bg-custom-primary-color"></div>
            </div>
            <div className="w-fit h-[280px] flex justify-center items-center gap-20">
              <div className="pl-[178px] w-[430px] h-fit flex items-end">
                <img
                  className="mr-[1px] h-[250px] w-[250px] object-cover rounded-full border-custom-primary-color border-[2px]"
                  src={homepageCircle1}
                  alt=""
                />
              </div>
              <div>
                <div className="text-xl font-bold">Students</div>
                <div className="text-custom-text-color text-sm">
                  Build skills and employability through our
                  <br />
                  extensive placement preparation courses, industry-
                  <br />
                  grades assessments, and AI-Driven mock interviews.
                </div>
              </div>
            </div>
            <div className="w-fit h-[280px] flex justify-center items-center gap-20">
              <div className="pr-[1px]">
                <div className="text-xl font-bold">Placement Officers</div>
                <div className="text-custom-text-color text-sm">
                  Optimize placement success with tailored
                  <br />
                  courses, unified-reporting, collaborative features,
                  <br />
                  and AI-driven drive creation and automation.
                </div>
              </div>
              <img
                className=" h-[250px] w-[250px] object-cover rounded-full border-custom-primary-color border-[2px]"
                src={homepageCircle2}
                alt=""
              />
            </div>
          </div>
        </div>

        <div
          id="more"
          className="w-full h-fit flex flex-col justify-center items-center gap-10 mt-10"
        >
          <div className="text-3xl font-extrabold">Why Choose Us?</div>
          <div className="bg-custom-gray rounded-2xl w-fit h-fit flex gap-20 px-10 py-10">
            <div className="flex gap-4">
              <div className="h-20 w-20 rounded-full bg-white flex justify-center items-center shadow-custom-box-shadow">
                <img className="w-16" src={logo5} alt="" />
              </div>
              <div>
                <div className="text-xl text-custom-text-color font-bold">
                  Centralized Placement Management
                </div>
                <div className="text-xs text-custom-text-color font-light leading-4">
                  A unified platforrn for placement officers to track student
                  <br />
                  performance, manage drives, and evaluate candidates-all in one
                  <br />
                  place, reducing nanual tasks and miscommunication
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-20 w-20 rounded-full bg-white flex justify-center items-center shadow-custom-box-shadow">
                <img className="w-12" src={logo6} alt="" />
              </div>
              <div>
                <div className="text-xl text-custom-text-color font-bold">
                  One-Stop Student Preparation
                </div>
                <div className="text-xs text-custom-text-color font-light leading-4">
                  Streamline interview practice, assessments, and progress
                  <br />
                  tracking for students on a single platform, minimizing
                  <br />
                  inefficiencies and keeping them organized.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="contact"
          className="w-full flex flex-col justify-center items-center py-3 gap-4 my-10"
        >
          <div className="text-3xl font-extrabold">Explore Marketplace</div>
          <div className="text-xl tracking-tight text-custom-text-color text-center">
            Enroll now using your email and start your journey to success.
            <br />
            Explore our marketplace now, absolutely free!
          </div>
          <div className="flex gap-4 mt-4">
            <input
              className="border-custom-text-color placeholder:text-custom-text-color border-[1px] rounded-[4px] text-sm bg-transparent  w-[300px] py-4 pl-3"
              type="email"
              placeholder="Enter your Email ID"
            />
            <button className="text-white bg-custom-primary-color px-4 rounded-[4px]">
              Sign Up
            </button>
          </div>
        </div>

        <div className="bg-custom-gray/50 flex justify-between items-start px-10 py-5">
          <div className="w-[300px] flex flex-col justify-center items-start gap-2">
            <div className=" w-fit h-fit p-2 rounded-lg">
              <img className="h-10" src={charusatLogo} alt="" />
            </div>
            <div className="w-[300px] text-sm mb-4">
              StepAhead is an Al-powered placement portal that streamlines
              recruitment for institutions and students with features like
              automated drive management, personalized dashboards, and unified
              performance tracking-all
              <br />
              in one platform.
            </div>
            <div className="flex gap-4 ml-10 mb-2">
              <div>
                <img className="h-7" src={instaIcon} alt="" />
              </div>
              <div>
                <img className="h-7" src={mailIcon} alt="" />
              </div>
              <div>
                <img className="h-7" src={linkedInIcon} alt="" />
              </div>
            </div>
            <div>@stepahead Inc. 2023</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="mb-4">About</div>
            <div className="text-custom-text-color text-sm">Blog</div>
            <div className="text-custom-text-color text-sm">Community</div>
            <div className="text-custom-text-color text-sm">Marketplace</div>
            <div className="text-custom-text-color text-sm">Products</div>
            <div className="text-custom-text-color text-sm">Company</div>
            <div className="text-custom-text-color text-sm">Career</div>
            <div className="text-custom-text-color text-sm">Security</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="mb-4">Explore</div>
            <div className="text-custom-text-color text-sm">
              Terms of service
            </div>
            <div className="text-custom-text-color text-sm">Privacy Policy</div>
            <div className="text-custom-text-color text-sm">
              Accessibility statement
            </div>
            <div className="text-custom-text-color text-sm">Guide</div>
            <div className="text-custom-text-color text-sm">
              Cookie Settings
            </div>
            <div className="text-custom-text-color text-sm">
              Resource Library
            </div>
          </div>
          <div className="flex flex-col gap-2 mr-32">
            <div className="mb-4">Contact Us</div>
            <div className="text-custom-text-color text-sm">FAQs</div>
            <div className="text-custom-text-color text-sm">Email Support</div>
            <div className="text-custom-text-color text-sm">Documents</div>
            <div className="text-custom-text-color text-sm">
              Customer Support
            </div>
            <div className="text-custom-text-color text-sm">Help</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
