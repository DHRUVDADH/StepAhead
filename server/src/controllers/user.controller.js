import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access tokens"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password, userRole } = req.body;

  if (
    [firstname, lastname, email, password, userRole].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required.");
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const user = await User.create({
    firstname: firstname,
    lastname: lastname,
    email,
    password,
    userRole,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully."));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Enter all the fields.");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exist.");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid User Credentials");
  }

  const { refreshToken, accessToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User Logged In Successfully."
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out"));
});

const setUserDetails = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid User ID format");
  }

  const userExist = await User.findById(userId);

  if (!userExist) {
    throw new ApiError(401, "Enter valid MenuItem");
  }

  const {
    firstname,
    lastname,
    gender,
    selectedDate,
    mobileNo,
    idNo,
    batch,
    degree,
    department,
    ssc,
    hsc,
    currentCgpa,
    currentSem,
  } = req.body;

  const avatarFile = req.files?.avatar?.[0] || null;
  const resumeFile = req.files?.resume?.[0] || null;

  if (!selectedDate) {
    throw new ApiError(400, "Date of Birth is required.");
  }

  const date = new Date(selectedDate);
  const isValidDate = date instanceof Date && !isNaN(date);

  if (!isValidDate) {
    throw new ApiError(400, "Invalid Date of Birth.");
  }

  const requiredFields = [
    firstname,
    lastname,
    gender,
    mobileNo,
    idNo,
    batch,
    degree,
    department,
    ssc,
    hsc,
    currentCgpa,
    currentSem,
  ];

  if (
    requiredFields.some(
      (field) => !field || (typeof field === "string" && field.trim() === "")
    )
  ) {
    throw new ApiError(400, "All fields are required.");
  }

  let avatarUrl = userExist.avatar || "";
  let resumeUrl = userExist.resume || "";

  // ----- Handle Avatar Upload -----
  if (avatarFile) {
    if (userExist.avatar) {
      if (avatarUrl.startsWith("http")) {
        const oldAvatarPublicId = avatarUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(oldAvatarPublicId);
      } else {
        const localAvatarPath = path.join(
          __dirname,
          "../uploads",
          path.basename(avatarUrl)
        );
        fs.unlink(localAvatarPath, (err) => {
          if (err) console.error("Error deleting old avatar:", err);
        });
      }
    }

    const avatarUpload = await uploadOnCloudinary(avatarFile.path);
    if (!avatarUpload.url) {
      throw new ApiError(400, "Error uploading avatar to Cloudinary");
    }
    avatarUrl = avatarUpload.url;
  }

  // ----- Handle Resume Upload -----
  if (resumeFile) {
    if (userExist.resume) {
      if (resumeUrl.startsWith("http")) {
        const oldResumePublicId = resumeUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(oldResumePublicId);
      } else {
        const localResumePath = path.join(
          __dirname,
          "../uploads",
          path.basename(resumeUrl)
        );
        fs.unlink(localResumePath, (err) => {
          if (err) console.error("Error deleting old resume:", err);
        });
      }
    }

    const resumeUpload = await uploadOnCloudinary(resumeFile.path);
    if (!resumeUpload.url) {
      throw new ApiError(400, "Error uploading resume to Cloudinary");
    }
    resumeUrl = resumeUpload.url;
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        firstname,
        lastname,
        gender,
        dob: date,
        mobileNo,
        collegeId: idNo,
        batch,
        degree,
        department,
        sscPercent: ssc,
        hscPercent: hsc,
        currentCGPA: currentCgpa,
        currentSemester: currentSem,
        avatar: avatarUrl,
        resume: resumeUrl,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedUser, "User details updated successfully.")
    );
});

const getUserDetails = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid User ID format");
  }

  const userExist = await User.findById(userId);
  return res
    .status(200)
    .json(new ApiResponse(200, userExist, "User Details fetched successfully"));
});

export { registerUser, loginUser, logoutUser, setUserDetails, getUserDetails };
