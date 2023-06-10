import { authenticationRequired } from "@dumiorg/coursehouse-common";
import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { checkCourseOwnership } from "../middleware/check-course-ownership";

const router = Router();

router.post(
  "/api/courses/:courseId/lessons",
  authenticationRequired,
  checkCourseOwnership,
  expressAsyncHandler((req, res) => {
    res.send("Create lesson");
  })
);

export { router as createLessonRouter };
