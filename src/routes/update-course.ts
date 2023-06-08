import { Router } from "express";

const router = Router();

router.patch("/api/courses/:courseId", (req, res) => {
  res.send("Update course");
});

export { router as updateCourseRouter };
