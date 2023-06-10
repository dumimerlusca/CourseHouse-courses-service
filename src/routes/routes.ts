import { Router } from "express";
import { categoriesRouter } from "./categories";
import { createCourseRouter } from "./create-course";
import { createLessonRouter } from "./create-lesson";
import { getCoursesRouter } from "./get-courses";
import { updateCourseRouter } from "./update-course";
import { updateLessonRouter } from "./update-lesson";

const router = Router();

router.use(categoriesRouter);
router.use(createCourseRouter);
router.use(createLessonRouter);
router.use(getCoursesRouter);
router.use(updateCourseRouter);

router.use(updateCourseRouter);
router.use(updateLessonRouter);

export { router };
