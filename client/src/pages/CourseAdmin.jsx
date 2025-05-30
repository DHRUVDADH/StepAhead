import React, { useState, useEffect } from "react";
import Navbar from "@/utils/Navbar";
import AddCourse from "@/utils/AddCourse";
import CourseItem from "@/utils/CourseItem";
import { useAuth } from "@/ProtectedRoutes/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { BACKEND_BASEURL } from 

const CourseAdmin = () => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [courseData, setCourseData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editModeData, setEditModeData] = useState("");
  const backMode = {
    title: "Manage Course",
    desc: "Manage existing courses and create new ones effortlessly.",
    mode: false,
  };
  const isElement = {
    mode: false,
    sectionTitle: "-",
    sectionItem: "-",
  };

  const getUserDetails = async (courseUser) => {
    try {
      const response = await axios.get(
        `${import.meta.env.BACKEND_BASEURL}/api/v1/users/getUser/${courseUser}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const fullname =
        response.data.message.firstname + " " + response.data.message.lastname;

      return fullname;
    } catch (error) {
      console.error(
        "User Data in Course failed:",
        error.response?.data?.error || error.message
      );
      toast.error("User Data in Course fetch failed. Please try again.");
    }
  };

  const handleCourseData = async (queryParam = searchQuery) => {
    try {
      const page = 1;
      const limit = 100;
      const sortBy = "createdAt";
      const sortType = -1;
      const response = await axios.get(
        `${import.meta.env.BACKEND_BASEURL}/api/v1/courses/getAllCourses?page=${page}&limit=${limit}&sortBy=${sortBy}&sortType=${sortType}&query=${queryParam}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCourseData(response.data.message);
    } catch (error) {
      console.error(
        "Course Data failed:",
        error.response?.data?.error || error.message
      );
      toast.error("Course Data fetch failed. Please try again.");
    }
  };

  useEffect(() => {
    handleCourseData();
  }, []);

  return (
    <div className="w-fit flex flex-col justify-center items-center gap-16 bg-custom-bg relative">
      <Navbar
        className="w-fit"
        backMode={backMode}
        isElement={isElement}
      ></Navbar>

      {isEditMode ? (
        <div className="h-full w-[1130px] flex justify-center">
          <AddCourse
            editModeData={editModeData}
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
          />
        </div>
      ) : (
        <div className="w-full h-fit flex flex-col  justify-center items-center gap-10 ">
          <div className="w-full h-fit flex justify-end ">
            <button className="bg-custom-primary-color px-4 py-3 rounded-lg text-white">
              Create a new course
            </button>
          </div>
          <div className="w-fit h-fit">
            <div className=" bg-custom-bg-3 px-8 py-4">
              <div className="w-full flex items-center">
                <div className="text-xl mr-4">
                  <i class="fa-solid fa-bars"></i>
                </div>
                <div className="relative bg-white rounded-3xl overflow-hidden px-4  mr-[450px]">
                  <input
                    className="w-[300px] h-12 focus:outline-none"
                    type="text"
                    placeholder="Search a name"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCourseData(); // fetch results on Enter key
                      }
                    }}
                  />
                  <i
                    onClick={() => handleCourseData()}
                    class="fa-solid fa-magnifying-glass"
                  ></i>
                </div>
                {/* <div className="flex justify-between w-72 bg-white/80 text-black/60  rounded-3xl">
                  Search Course{" "}
                  <span>
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </span>
                </div> */}
                <div className="text-xl mr-4">
                  <i class="fa-solid fa-download"></i>
                </div>
                <div className="bg-white/80 px-3 py-2 text-black flex gap-8 items-center rounded-sm mr-4">
                  Batch
                  <i class="fa-solid fa-angle-down"></i>
                </div>
                <div className="bg-white/80 px-3 py-2 text-black flex gap-8 items-center rounded-sm">
                  Status
                  <i class="fa-solid fa-angle-down"></i>
                </div>
              </div>
              <div className="w-full h-fit flex flex-col gap-2">
                <div className="w-full h-fit flex items-center px-2 py-5">
                  <div className="text-md px-2 w-[250px] mr-8">Course Name</div>
                  <div className="text-md px-2 w-[150px] mr-8">Course Type</div>
                  <div className="text-md px-2 w-[140px] mr-8">
                    No. of modules
                  </div>
                  <div className="text-md px-2 w-[140px] mr-8">
                    No. of enrolled
                  </div>
                  <div className="text-md px-2 w-[200px] mr-8">Created By</div>
                </div>
                {courseData &&
                  courseData.docs.map((course) => (
                    <CourseItem
                      key={course._id}
                      course={course}
                      setEditModeData={setEditModeData}
                      getUserDetails={getUserDetails}
                      setIsEditMode={setIsEditMode}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseAdmin;
