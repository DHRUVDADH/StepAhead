import { Course } from "../models/course.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

const createCourse = asyncHandler(async (req, res) => {
  const { courseName, courseDuration, courseLevel, courseType } = req.body;

  const { userId } = req.params;
  if (
    [courseName, courseLevel, courseType].some(
      (field) => field?.trim() === ""
    ) ||
    [courseDuration].some((field) => field === undefined || field === null) ||
    [].some((field) => field === undefined || field === null)
  ) {
    throw new ApiError(400, "All fields are required.");
  }

  const existedCourse = await Course.findOne({
    courseName,
  });
  if (existedCourse) {
    throw new ApiError(409, "Course already exists");
  }

  const avatarLocalPath = req.file?.path;
  // console.log("Image Local Path:", avatarLocalPath);
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar || !avatar.url) {
    throw new ApiError(402, "Avatar file is required");
  }

  const course = await Course.create({
    courseName,
    courseDuration,
    courseLevel,
    courseUser: userId,
    courseAvatar: avatar.url,
    courseType,
  });

  if (!course) {
    throw new ApiError(500, "Something went wrong while creating the Course");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, course, "New Course Created Successfully."));
});

const getAllCourses = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 3,
    query,
    sortBy = "createdAt",
    sortType = -1,
  } = req.query;

  // Step 1: Build the aggregation pipeline
  const aggregationPipeline = [];

  // Step 2: Apply search filter if query is provided
  if (query) {
    aggregationPipeline.push({
      $match: {
        $or: [
          { courseName: { $regex: query, $options: "i" } }, // Case-insensitive title search
          { courseLevel: { $regex: query, $options: "i" } }, // Case-insensitive description search
        ],
      },
    });
  }

  // Step 3: Sorting (Default: Newest first)
  aggregationPipeline.push({
    $sort: { [sortBy]: parseInt(sortType) }, // Converts sortType ("1" or "-1") to Number
  });

  // Step 4: Apply Pagination
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  // Step 5: Execute the query
  const result = await Course.aggregatePaginate(
    Course.aggregate(aggregationPipeline),
    options
  );

  // Step 6: Send response
  return res
    .status(200)
    .json(new ApiResponse(200, result, "Categories fetched successfully"));
});

const getCourseDetails = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, "Course ID is missing");
  }

  const course = await Course.findById(courseId);

  if (!course) {
    throw new ApiError(404, "Course does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, course, "Course fetched successfully"));
});

const deleteCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(404, "Course does not exist");
  }

  const courseExist = await Course.findById(courseId);

  if (!courseExist) {
    throw new ApiError(400, "Enter valid Course id");
  }
  if (courseExist.image) {
    const courseUrl = courseExist.image;

    try {
      // Deleting Thumbnail
      if (courseUrl.startsWith("http")) {
        const oldImagePublicId =
          await cloudinary.utils.extractPublicId(courseUrl);
        await cloudinary.uploader.destroy(oldImagePublicId);
      } else {
        const localImagePath = path.join(
          __dirname,
          "../uploads",
          path.basename(courseUrl)
        );
        await fs.promises.unlink(localImagePath);
      }
    } catch (error) {
      console.error("Error deleting old files:", error);
    }
  }
  await Course.findByIdAndDelete(courseId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Course Deleted Successfully"));
});

export { createCourse, getAllCourses, getCourseDetails, deleteCourse };
