import { Router } from "express";
import { createCourseRouter } from "./create-course";
import { createLessonRouter } from "./create-lesson";
import { updateCourseRouter } from "./update-course";
import { updateLessonRouter } from "./update-lesson";

const router = Router();

router.use(createCourseRouter);
router.use(createLessonRouter);
router.use(updateCourseRouter);
router.use(updateLessonRouter);

export { router };
