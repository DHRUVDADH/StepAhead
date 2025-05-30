import { Router } from "express";
import {
  createCourse,
  getAllCourses,
  getCourseDetails,
  deleteCourse
} from "../controllers/course.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.use(verifyJWT);
router.route("/getAllCourses").get(getAllCourses);
router.route("/deleteCourse/:courseId").delete(deleteCourse);
router.route("/getCourseDetails/:courseId").get(getCourseDetails);
router.route("/:userId").post(upload.single("courseAvatar"), createCourse);


export default router;
