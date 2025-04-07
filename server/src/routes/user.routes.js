import { Router } from "express";
import {
  registerUser,
  loginUser,
  setUserDetails,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { ApiError } from "../utils/ApiError.js";

const router = Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);

router
  .use(verifyJWT)
  .route("/setUserDetails/:userId")
  .post(
    (req, res, next) => {
      upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "resume", maxCount: 1 },
      ])(req, res, function (err) {
        if (err) {
          console.log(err);
          return res.status(400).json(new ApiError(400, err.message));
        }
        next();
      });
    },

    setUserDetails
  );

export default router;
