import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useAuth } from "../ProtectedRoutes/AuthContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import charusatLogo from "../assets/charusat_logo.png";
import dropdownArrowGray from "../assets/dropdown_arrow_gray.svg";
import uploadIcon from "../assets/upload_icon.svg";

const EnterProfileInformation = () => {
  const { user } = useAuth();

  const [showCalendar, setShowCalendar] = useState(false);
  const [showPersonalInfo, setShowPersonalInfo] = useState(true);
  const [avatar, setAvatar] = useState("");
  const [previewAvatar, setPreviewAvatar] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [mobileNo, setMobileNo] = useState("");
  const [idNo, setIdNo] = useState("");
  const [batch, setBatch] = useState("");
  const [degree, setDegree] = useState("");
  const [department, setDepartment] = useState("");
  const [ssc, setSsc] = useState("");
  const [hsc, setHsc] = useState("");
  const [currentCgpa, setCurrentCgpa] = useState("");
  const [currentSem, setCurrentSem] = useState("");
  const [resume, setResume] = useState("");

  // console.log(avatar);
  // console.log(firstname);
  // console.log(lastname);
  // console.log(gender);
  // console.log(selectedDate);
  // console.log(mobileNo);
  // console.log(idNo);
  // console.log(batch);
  // console.log(degree);
  // console.log(department);
  // console.log(ssc);
  // console.log(hsc);
  // console.log(currentCgpa);
  // console.log(currentSem);
  // console.log(resume);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");
    // console.log("User object:", user);
    console.log("Token:" , token);

    if (!token) {
      toast.error("Please login again");
      return;
    }
    const formData = new FormData();

    formData.append("avatar", avatar);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("gender", gender);
    formData.append("selectedDate", selectedDate);
    formData.append("mobileNo", mobileNo);
    formData.append("idNo", idNo);
    formData.append("batch", batch);
    formData.append("degree", degree);
    formData.append("department", department);
    formData.append("ssc", ssc);
    formData.append("hsc", hsc);
    formData.append("currentCgpa", currentCgpa);
    formData.append("currentSem", currentSem);
    formData.append("resume", resume);

    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/users/setUserDetails/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("User details updation completed successfully!");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.error || error.message
      );
      toast.error("User Details Updation failed!");
    }
  };

  const scrollToSection = (elementId) => {
    document.getElementById(elementId).scrollIntoView({ behavior: "smooth" });
  };

  const handleDateSelect = (date) => {
    setSelectedDate(format(date, "yyyy-MM-dd"));
    setShowCalendar(false); // Close calendar on selection
  };

  const handleImageUpload = (e) => {
    const avatar1 = e.target.files[0];
    if (avatar1) {
      setAvatar(avatar1);
      setPreviewAvatar(URL.createObjectURL(avatar1));
    }
  };

  return (
    <div className="w-full h-fit flex flex-col gap-8">
      <div className="flex justify-start items-center gap-10 bg-custom-bg-3 py-4 pl-16">
        <div>
          <img className="h-14 bg-white" src={charusatLogo} alt="" />
        </div>
        <div className="flex flex-col gap-1 justify-center items-start">
          <div className="text-3xl font-semibold  tracking-tight">
            Complete Your Profile
          </div>
          <div className="text-sm tracking-tight">
            Kindly fill in your personal and academic details to complete your
            profile and get the most out of our problem.
          </div>
        </div>
      </div>

      <div className="w-full h-fit flex gap-4 justify-center items-center py-3">
        <button
          onClick={() => {
            setShowPersonalInfo(!showPersonalInfo);
            scrollToSection("personal");
          }}
          className={`text-4xl text-custom-text-color/80 px-20 py-5 rounded-lg border-2 border-custom-gray ${
            showPersonalInfo ? "bg-custom-bg-3 border-none" : ""
          }`}
        >
          Personal Information
        </button>
        <button
          onClick={() => {
            setShowPersonalInfo(!showPersonalInfo);
            scrollToSection("academic");
          }}
          className={`text-4xl text-custom-text-color/80 px-20 py-5 rounded-lg border-2 border-custom-gray ${
            showPersonalInfo ? "" : "bg-custom-bg-3 border-none"
          }`}
        >
          Academic Information
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className=" flex flex-col pl-52 gap-4 mb-20"
      >
        <div className="h-fit w-fit flex flex-col gap-2 justify-center items-center">
          <div id="personal" className="h-fit w-fit rounded-full">
            {previewAvatar ? (
              <img
                src={previewAvatar}
                className="h-[170px] w-[170px] rounded-full object-covere"
              />
            ) : (
              <p className="bg-custom-gray/30 text-[100px] text-custom-text-color/20 p-2 px-10 rounded-full">
                <i className="fa-solid fa-user"></i>
              </p>
            )}
          </div>
          <label
            className="text-custom-primary-color underline text-sm"
            htmlFor="imagefile"
          >
            Change Image
          </label>
          <input
            type="file"
            id="imagefile"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        <div className="flex gap-[20px]">
          <div className="text-custom-text-color flex flex-col gap-2">
            <label htmlFor="firstname" className="font-[500]">
              First Name
            </label>
            <input
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="border-[1px] border-custom-text-color w-[420px] px-3 py-3 rounded-md bg-custom-bg"
              placeholder="Enter your first name"
              type="text"
              id="firstname"
            />
          </div>
          <div className="text-custom-text-color flex flex-col gap-2">
            <label htmlFor="lastname" className="font-[500]">
              Last Name
            </label>
            <input
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="border-[1px] border-custom-text-color w-[420px] px-3 py-3 rounded-md bg-custom-bg"
              placeholder="Enter your last name"
              type="text"
              id="lastname"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-start gap-2">
          <div className="font-[500]">Gender</div>
          <div className="flex w-fit justify-center items-center gap-2">
            <input
              type="radio"
              id="male"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label className="font-light mr-8" htmlFor="male">
              Male
            </label>
            <input
              type="radio"
              id="female"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label className="font-light" htmlFor="female">
              Female
            </label>
          </div>
        </div>

        <div className="w-fit h-fit flex flex-col gap-2 relative">
          <label className="mt-2 text-custom-text-color font-semibold">
            DOB:
          </label>
          <div
            className="border-[1px] border-custom-text-color w-[200px] px-3 py-3 rounded-md bg-custom-bg"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            {selectedDate
              ? format(selectedDate, "yyyy-MM-dd")
              : "Select your DOB"}
          </div>
          {showCalendar && (
            <div className="absolute top-24 z-50 mt-2 rounded-md bg-custom-bg">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="rounded-md border"
                disabled={(date) => date > new Date()}
              ></Calendar>
            </div>
          )}
        </div>

        <div className="text-custom-text-color flex flex-col gap-2">
          <div className="font-[500]">Mobile Number</div>
          <div className="border-[1px] border-custom-text-color h-[50px] w-[420px] px-3 py-3 rounded-md bg-custom-bg flex justify-start items-center pl-4 gap-4">
            <div className="tracking-widest">+91</div>
            <div className="h-full w-[1.5px] bg-custom-text-color/70"></div>
            <input
              className="h-[48px] w-fit bg-custom-bg border-none focus:outline-none focus:border-none tracking-widest"
              type="text"
              maxLength={10}
              onInput={(e) => {
                e.target.value = e.target.value
                  .replace(/[^0-9]/g, "")
                  .slice(0, 10);
              }}
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="text-custom-text-color flex flex-col gap-2">
          <label htmlFor="idno" className="font-[500]">
            ID number
          </label>
          <input
            className="border-[1px] border-custom-text-color w-[420px] px-3 py-3 rounded-md bg-custom-bg tracking-wider"
            placeholder="Enter your ID number : 22dit001"
            type="text"
            id="idno"
            value={idNo}
            onChange={(e) => setIdNo(e.target.value)}
          />
        </div>

        <div id="academic" className="flex gap-[20px]">
          <div className="w-fit text-custom-text-color flex flex-col gap-1 relative">
            <label className="font-[500]">Batch</label>
            <div>
              <img
                className="h-6 absolute top-[46px] right-1"
                src={dropdownArrowGray}
                alt=""
              />
            </div>
            <select
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              className="border-[1px] border-custom-text-color w-[200px] px-3 py-3 rounded-md bg-custom-bg appearance-none"
            >
              <option value="">Select Your Batch</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
            </select>
          </div>

          <div className="w-fit text-custom-text-color flex flex-col gap-1 relative">
            <label className="font-[500]">Degree</label>
            <div>
              <img
                className="h-6 absolute top-[46px] right-1"
                src={dropdownArrowGray}
                alt=""
              />
            </div>
            <select
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="border-[1px] border-custom-text-color w-[420px] px-3 py-3 rounded-md bg-custom-bg appearance-none"
            >
              <option value="">Select Your Degree</option>
              <option value="Bachelors of Technology">
                Bachelors of Technology
              </option>
              <option value="Masters of Technology">
                Masters of Technology
              </option>
              <option value="Bachelors in Bussiness Administration">
                Bachelors in Bussiness Administration
              </option>
              <option value="Masters in Bussiness Administration">
                Masters in Bussiness Administration
              </option>
              <option value="Bachelors of Computer Applications">
                Bachelors of Computer Applications
              </option>
              <option value="Masters in Computer Application">
                Masters in Computer Application
              </option>
            </select>
          </div>

          <div className="w-fit text-custom-text-color flex flex-col gap-1 relative">
            <label className="font-[500]">Department</label>
            <div>
              <img
                className="h-6 absolute top-[46px] right-1"
                src={dropdownArrowGray}
                alt=""
              />
            </div>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="border-[1px] border-custom-text-color w-[420px] px-3 py-3 rounded-md bg-custom-bg appearance-none"
            >
              <option value="">Select Your Department</option>
              <option value="Information Technology">
                Information Technology
              </option>
              <option value="Computer Engineering">Computer Engineering</option>
              <option value="Computer Science and Engineering">
                Computer Science and Engineering
              </option>
              <option value="Electronics and Communication Engineering">
                Electronics and Communication Engineering
              </option>
              <option value="Electrical Engineering">
                Electrical Engineering
              </option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Mechanical Engineering">
                Mechanical Engineering
              </option>
            </select>
          </div>
        </div>

        <div className="flex gap-[20px]">
          <div className="text-custom-text-color flex flex-col gap-1">
            <label htmlFor="ssc" className="font-[500]">
              10th
            </label>
            <input
              className="border-[1px] border-custom-text-color w-[200px] px-3 py-3 rounded-md bg-custom-bg"
              placeholder="Enter your SSC %"
              type="text"
              id="ssc"
              onInput={(e) => {
                let value = e.target.value.replace(/[^0-9]/g, "");

                if (value !== "") {
                  let num = parseInt(value, 10);
                  if (num > 100) num = 100;
                  else if (num < 1) num = 1;
                  e.target.value = num.toString();
                } else {
                  e.target.value = "";
                }
              }}
              value={ssc}
              onChange={(e) => setSsc(e.target.value)}
            />
          </div>
          <div className="text-custom-text-color flex flex-col gap-1">
            <label htmlFor="ssc" className="font-[500]">
              12th
            </label>
            <input
              className="border-[1px] border-custom-text-color w-[200px] px-3 py-3 rounded-md bg-custom-bg"
              placeholder="Enter your HSC %"
              type="text"
              id="hsc"
              onInput={(e) => {
                let value = e.target.value.replace(/[^0-9]/g, "");

                if (value !== "") {
                  let num = parseInt(value, 10);
                  if (num > 100) num = 100;
                  else if (num < 1) num = 1;
                  e.target.value = num.toString();
                } else {
                  e.target.value = "";
                }
              }}
              value={hsc}
              onChange={(e) => setHsc(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-[20px]">
          <div className="text-custom-text-color flex flex-col gap-1">
            <label htmlFor="cgpa" className="font-[500]">
              current CGPA
            </label>
            <input
              className="border-[1px] border-custom-text-color w-[200px] px-3 py-3 rounded-md bg-custom-bg"
              placeholder="Enter your current CGPA"
              type="text"
              id="cgpa"
              onInput={(e) => {
                let value = e.target.value;

                // Allow only numbers and decimals
                value = value.replace(/[^0-9.]/g, "");

                // Allow only one decimal point
                const parts = value.split(".");
                if (parts.length > 2) {
                  value = parts[0] + "." + parts[1];
                }

                if (parts.length === 2) {
                  parts[1] = parts[1].slice(0, 2); // 👈 limit to 2 digits after decimal
                  value = parts[0] + "." + parts[1];
                }

                // Handle case where user is typing just "."
                if (value === ".") {
                  e.target.value = "0.";
                  return;
                }

                // Validate and set value
                if (value !== "") {
                  const num = parseFloat(value);

                  if (!isNaN(num)) {
                    if (num > 10) {
                      e.target.value = "10";
                    } else if (num < 1 && value.length > 1) {
                      e.target.value = "1";
                    } else {
                      e.target.value = value;
                    }
                  } else {
                    e.target.value = "";
                  }
                } else {
                  e.target.value = "";
                }
              }}
              value={currentCgpa}
              onChange={(e) => setCurrentCgpa(e.target.value)}
            />
          </div>
          <div className="text-custom-text-color flex flex-col gap-1 relative">
            <label className="font-[500]">current Semester</label>
            <div>
              <img
                className="h-6 absolute top-[46px] right-1"
                src={dropdownArrowGray}
                alt=""
              />
            </div>
            <select
              value={currentSem}
              onChange={(e) => setCurrentSem(e.target.value)}
              className="border-[1px] border-custom-text-color w-[200px] px-3 py-3 rounded-md bg-custom-bg appearance-none"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="resume" className="font-semibold">
            Resume
            <br />
            <span className="text-sm font-light">
              Please upload your resume in PDF format
            </span>
          </label>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="application/pdf"
            id="resume"
            className="hidden"
            onChange={(e) => {
              setResume(e.target.files[0]);
            }}
          />

          <div className="w-fit flex justify-center items-center px-4 py-2 bg-[#E9E5FB] gap-4 rounded-lg">
            <label
              htmlFor="resume"
              className="w-fit text-custom-bg font-medium cursor-pointer"
            >
              Upload Resume
            </label>
            <img className="h-5" src={uploadIcon} alt="" />
          </div>

          <div
            className={`text-sm text-custom-text-color/50 ${
              resume ? `block` : `hidden`
            }`}
          >
            {resume ? `${resume.name}` : ""}
          </div>
        </div>

        <div className="w-full flex justify-center items-center">
          <button
            type="submit"
            className="bg-custom-primary-color/90 text-custom-bg px-20 py-2 rounded-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnterProfileInformation;
