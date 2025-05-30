import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AddCourse = ({ isEditMode, setIsEditMode, editModeData }) => {
  const token = localStorage.getItem("accessToken");
  const [courseavatar, setCourseavatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState("");
  const [coursename, setCoursename] = useState("");
  const [courseLevel, setCourseLevel] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchCourseDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.BACKEND_BASEURL}/api/v1/courses/getCourseDetails/${editModeData}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.message;
      console.log("Fetched data:", data); // Check fetched data in the console
      // Set course details directly in the state
      setCoursename(data.courseName || "");
      setCourseLevel(data.courseLevel || "");
      setPreviewAvatar(data.courseAvatar || "");
    } catch (error) {
      console.error(
        "Course Data failed:",
        error.response?.data?.error || error.message
      );
      toast.error("Course Data fetch failed. Please try again.");
    } finally {
      setIsLoading(false); // stop loading
    }
  };

  useEffect(() => {
    if (isEditMode && editModeData) {
      fetchCourseDetails();
    } else {
      // Reset form if not in edit mode
      setCoursename("");
      setCourseLevel("");
      setPreviewAvatar("");
    }
  }, [isEditMode, editModeData]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourseavatar(file);
      setPreviewAvatar(URL.createObjectURL(file)); // Update preview image
    }
  };

  // Debugging: Log coursetype to check if it's properly set
  console.log("Course Type:", courseLevel);

  return (
    <div className="w-fit h-fit flex items-center justify-end bg-custom-primary-color/50 py-5 rounded-lg">
      {isLoading ? (
        <div className="h-20 w-20 flex justify-center items-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : (
        <div className="h-fit w-fit flex flex-col items-center justify-center">
          <div className="flex justify-between w-full items-center mb-6 px-20 sm:px-10 pb-8 pt-4 border-b-[1px] border-custom-text-color/50">
            <h2 className="sm:text-2xl text-lg">
              {isEditMode ? "Update Course" : "Add New Course"}
            </h2>
            <div
              onClick={() => setIsEditMode(false)}
              className="cursor-pointer p-3/4 sm:p-1 rounded-full"
            >
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
          <div className="h-fit w-fit flex flex-col items-center mx-10 gap-2">
            <div className="bg-custom-input-bg w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] overflow-hidden rounded-xl border-[1px] border-custom-text-color/70">
              {previewAvatar ? (
                <img
                  className="sm:h-[200px] sm:w-[200px] object-cover"
                  src={previewAvatar}
                  alt="Preview"
                />
              ) : (
                <p className="flex justify-center items-center h-full w-full text-custom-text-color/70">
                  No Image
                </p>
              )}
            </div>
            <label
              htmlFor="imagefile"
              className="text-sm underline underline-offset-2 text-custom-pink cursor-pointer"
            >
              Change Course Avatar
            </label>
            <input
              onChange={handleImageUpload}
              id="imagefile"
              className="hidden"
              type="file"
            />
          </div>
          <div className="sm:w-[450px] w-[280px] mx-10 mt-8 flex flex-col items-start">
            <label className="text-[11px] ml-1" htmlFor="name">
              Course Name
            </label>
            <input
              className="text-black placeholder:text-black/40 rounded-md w-full px-2 py-2 mt-1"
              type="text"
              id="name"
              placeholder="Enter Course name"
              value={coursename}
              onChange={(e) => setCoursename(e.target.value)}
              required
            />
          </div>
          <div className="sm:w-[450px] w-[280px] mx-10 mt-8 flex flex-col items-start">
            <label className="text-[11px] ml-1" htmlFor="courseType">
              Course Type
            </label>

            <select
              id="courseLevel"
              className="bg-custom-input-bg text-black rounded-md w-full px-2 py-2 mt-1"
              value={courseLevel}
              onChange={(e) => setCourseLevel(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Course Type
              </option>
              <option value="Basic">Basic</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div className="flex gap-4 mt-8">
            <button className="rounded-lg border-[1.2px] border-custom-primary-color text-custom-primary-color bg-white px-4">
              <i class="fa-solid fa-circle-plus pr-1"></i>
              Add new module
            </button>
            <button className="bg-custom-primary-color px-4 py-3 rounded-lg text-white">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCourse;
