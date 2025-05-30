import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import Navbar from "@/utils/Navbar";
import { useAuth } from "@/ProtectedRoutes/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const token = localStorage.getItem("accessToken");
  const [editMode, setEditMode] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [editResume, setEditResume] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);

  const handleProfileData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.BACKEND_BASEURL}/api/v1/users/getUser/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserData(response.data.message);
      // toast.success("User Data Fetched Successfully!!!");
    } catch (error) {
      console.error(
        "User Data failed:",
        error.response?.data?.error || error.message
      );
      toast.error("User Data fetch failed. Please try again.");
    }
  };

  useEffect(() => {
    handleProfileData();
  }, []);

  const getDegree = (degree) => {
    switch (degree) {
      case "Bachelors of Technology":
        return "B.Tech.";
      case "Masters of Technology":
        return "M.Tech.";
      case "Bachelors in Bussiness Administration":
        return "B.B.A.";
      case "Masters in Bussiness Administration":
        return "M.B.A.";
      case "Bachelors of Computer Applications":
        return "B.C.A.";
      case "Masters in Computer Application":
        return "B.C.A.";
    }
  };
  const previewUrl = userData?.resume.replace(".pdf", ".jpg");
  const backMode = {
    title: "Your Profile",
    desc: "Manage and Update your personal and academic information seamlessly.",
    mode: false,
  };
  const isElement = {
    mode: false,
    sectionTitle: "-",
    sectionItem: "-",
  };

  return (
    <div className="w-fit h-fit flex flex-col gap-16 bg-custom-bg">
      <Navbar backMode={backMode} isElement={isElement}></Navbar>
      <div className="w-full h-fit flex flex-col  justify-center items-center gap-10">
        <div className="w-4/5 h-fit flex justify-center items-center gap-10 shadow-custom-my-shadow py-4 rounded-xl relative">
          <div className="p-1 h-fit w-fit border-custom-primary-color border-[10px] rounded-full relative mr-10">
            <img className="h-40 rounded-full" src={userData?.avatar} alt="" />
            <button
              onClick={() => navigate("/enterProfileInformation")}
              className="text-sm font-semibold text-custom-primary-color absolute bottom-[-12px] left-[60px] bg-custom-bg px-2 py-1 shadow-custom-my-shadow rounded-xl "
            >
              Edit
            </button>
          </div>
          <div className="flex flex-col justify-center items-start">
            <div className="text-2xl text-custom-text-color font-bold">
              {userData?.firstname} {userData?.lastname}
            </div>
            <div className="text-custom-text-color/70">
              {getDegree(userData?.degree)} {userData?.department}
            </div>
          </div>
          <div className="h-36 w-[2px] bg-custom-gray"></div>
          <div className="h-full w-fit flex flex-col gap-6 justify-center items-start">
            <div className="flex gap-4">
              <div className="text-custom-primary-color">
                <i class="fa-solid fa-phone"></i>
              </div>
              <div className="text-custom-text-color/70">
                {userData?.mobileNo}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-custom-primary-color">
                <i class="fa-solid fa-envelope"></i>
              </div>
              <div className="text-custom-text-color/70">{userData?.email}</div>
            </div>
          </div>
          <button
            onClick={() => navigate("/enterProfileInformation")}
            className="flex justify-center items-center text-custom-primary-color gap-2 absolute top-3 right-6"
          >
            Edit{" "}
            <span className="text-xs">
              <i class="fa-solid fa-pen"></i>
            </span>
          </button>
        </div>

        <div className="w-full flex justify-center items-start gap-10 ">
          <div className="flex flex-col gap-8">
            <div className="w-[450px] flex flex-col justify-center gap-4 p-4 shadow-custom-my-shadow rounded-xl">
              <div className="flex justify-between items-center">
                <div className="text-2xl font-semibold">
                  Personal Information
                </div>
                <button
                  onClick={() => navigate("/enterProfileInformation")}
                  className="flex justify-center items-center text-custom-primary-color gap-2"
                >
                  Edit{" "}
                  <span className="text-xs">
                    <i class="fa-solid fa-pen"></i>
                  </span>
                </button>
              </div>
              <div>
                <div className="flex flex-col justify-center items-start gap-2">
                  <div className="font-[500] text-sm">Gender</div>
                  <div className="flex w-fit justify-center items-center gap-2">
                    <input
                      type="radio"
                      id="male"
                      value="male"
                      checked={"male" === userData?.gender}
                      // onChange={(e) => setGender(e.target.value)}
                    />
                    <label className="font-light mr-8 text-sm" htmlFor="male">
                      Male
                    </label>
                    <input
                      type="radio"
                      id="female"
                      value="female"
                      checked={"female" === userData?.gender}
                      // onChange={(e) => setGender(e.target.value)}
                    />
                    <label className="font-light text-sm" htmlFor="female">
                      Female
                    </label>
                  </div>
                </div>
                <div className="w-fit h-fit flex flex-col gap-2 relative">
                  <label className="mt-2 text-custom-text-color font-semibold text-sm">
                    DOB:
                  </label>
                  <div className="border-[1px] border-custom-text-color w-[200px] px-3 py-2 rounded-md bg-custom-bg text-sm flex justify-between items-center">
                    {userData?.dob
                      ? format(new Date(userData.dob), "yyyy-MM-dd")
                      : "No date set"}
                    <i class="fa-solid fa-calendar-days"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[450px] p-4 shadow-custom-my-shadow">
              <div className="flex justify-between items-center">
                <div className="text-2xl font-semibold">Resume</div>
                <button
                  onClick={() => navigate("/enterProfileInformation")}
                  className="flex justify-center items-center text-custom-primary-color gap-2"
                >
                  Upload{" "}
                  <span className="text-xs">
                    <i class="fa-solid fa-arrow-up-from-bracket"></i>
                  </span>
                </button>
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="w-full flex justify-center items-center py-4 rounded-lg ">
                  <i class="fa-solid fa-paperclip"></i>
                  <div className="ml-2 mr-4">
                    {userData?.firstname}_Resume.pdf
                  </div>
                  <div className="h-8 w-[2px] bg-custom-primary-color/50 mr-4"></div>
                  <a
                    href={userData?.resume}
                    target="_blank"
                    className="text-custom-primary-color "
                  >
                    Download <i class="fa-solid fa-download"></i>
                  </a>
                </div>
                <div className="p-4 bg-custom-primary-color/50">
                  <img className="" src={previewUrl} alt="PDF preview" />
                </div>
              </div>
            </div>
          </div>  
          <div className="w-full h-fit flex flex-col gap-4 p-4 shadow-custom-my-shadow rounded-xl">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-semibold ">
                Academic Information
              </div>
              <button
                onClick={() => navigate("/enterProfileInformation")}
                className="flex justify-center items-center text-custom-primary-color gap-2"
              >
                Edit{" "}
                <span className="text-xs">
                  <i class="fa-solid fa-pen"></i>
                </span>
              </button>
            </div>
            <div className="text-custom-text-color flex flex-col gap-1">
              <label
                htmlFor="idno"
                className="font-[500] text-sm text-custom-text-color/70"
              >
                ID number
              </label>
              <div className="border-[1px] text-sm border-custom-text-color w-[520px] px-3 py-2 rounded-md bg-custom-bg tracking-wider">
                {userData?.collegeId}
              </div>
            </div>
            <div id="academic" className="flex gap-[20px]">
              <div className="w-fit text-custom-text-color flex flex-col gap-1">
                <label className="font-[500] text-sm text-custom-text-color/70">
                  Batch
                </label>
                <div className="border-[1px] text-sm border-custom-text-color w-[200px] px-3 py-2 rounded-md bg-custom-bg tracking-wider">
                  {userData?.batch}
                </div>
              </div>

              <div className="w-fit text-custom-text-color flex flex-col gap-1">
                <label className="font-[500] text-sm text-custom-text-color/70">
                  Degree
                </label>
                <div className=" border-[1px] text-sm border-custom-text-color w-[300px] px-3 py-2 rounded-md bg-custom-bg tracking-wider ">
                  {userData?.degree}
                </div>
              </div>
            </div>
            <div className="w-fit text-custom-text-color flex flex-col gap-1">
              <label className="font-[500] text-sm text-custom-text-color/70">
                Department
              </label>
              <div className="border-[1px] text-sm border-custom-text-color w-[520px] px-3 py-2 rounded-md bg-custom-bg tracking-wider">
                {userData?.department}
              </div>
            </div>
            <div className="flex gap-[20px]">
              <div className="w-fit text-custom-text-color flex flex-col gap-1">
                <label className="font-[500] text-sm text-custom-text-color/70">
                  10th
                </label>
                <div className="border-[1px] text-sm border-custom-text-color w-[250px] px-3 py-2 rounded-md bg-custom-bg tracking-wider">
                  {userData?.sscPercent}%
                </div>
              </div>
              <div className="w-fit text-custom-text-color flex flex-col gap-1">
                <label className="font-[500] text-sm text-custom-text-color/70">
                  12th
                </label>
                <div className="border-[1px] text-sm border-custom-text-color w-[250px] px-3 py-2 rounded-md bg-custom-bg tracking-wider">
                  {userData?.hscPercent}%
                </div>
              </div>
            </div>
            <div className="flex gap-[20px]">
              <div className="text-custom-text-color flex flex-col gap-1">
                <label
                  htmlFor="cgpa"
                  className="font-[500] text-custom-text-color/70"
                >
                  current CGPA
                </label>
                <div className="border-[1px] text-sm border-custom-text-color w-[250px] px-3 py-2 rounded-md bg-custom-bg tracking-wider">
                  {userData?.currentCGPA}
                </div>
              </div>
              <div className="text-custom-text-color flex flex-col gap-1 relative">
                <label className="font-[500] text-custom-text-color/70">
                  current Semester
                </label>
                <div className="border-[1px] text-sm border-custom-text-color w-[250px] px-3 py-2 rounded-md bg-custom-bg tracking-wider">
                  {userData?.currentSemester}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
