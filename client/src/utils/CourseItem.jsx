import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const CourseItem = ({
  course,
  getUserDetails,
  setEditModeData,
  setIsEditMode,
}) => {
  const [createdByName, setCreatedByName] = useState("");

  const token = localStorage.getItem("accessToken");

  const deleteCourse = async (courseId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.BACKEND_BASEURL}/api/v1/courses/deleteCourse/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Course Deleted Successfully.");
    } catch (error){
      console.error(
        "Course Data Deletion failed:",
        error.response?.data?.error || error.message
      );
      toast.error("Course Data delete failed. Please try again.");
    }
  };

  useEffect(() => {
    const fetchName = async () => {
      const name = await getUserDetails(course.courseUser);
      setCreatedByName(name);
    };
    fetchName();
  }, [course.courseUser]);
  return (
    <div className="w-full h-fit flex items-center px-2 py-2 bg-custom-primary-color/50">
      <div className="text-sm px-2 w-[250px] mr-8">{course.courseName}</div>
      <div className="text-sm px-2 w-[150px] mr-8">{course.courseLevel}</div>
      <div className="text-sm px-2 w-[140px] mr-8">
        {course.courseModules.length > 0 ? course.courseModules.length : 0}{" "}
      </div>
      <div className="text-sm px-2 w-[140px] mr-8">100</div>
      <div className="text-sm px-2 w-[200px] mr-8">
        {createdByName || "Loading..."}
      </div>
      <div
        onClick={() => deleteCourse(course._id)}
        className="text-md px-2 text-red-600 cursor-pointer"
      >
        <i class="fa-solid fa-trash-can"></i>
      </div>
      <div
        onClick={() => {
          setEditModeData(course._id);
          setIsEditMode(true);
        }}
        className="text-md px-2 text-green-600 cursor-pointer"
      >
        <i class="fa-solid fa-pen-to-square"></i>
      </div>
    </div>
  );
};

export default CourseItem;
