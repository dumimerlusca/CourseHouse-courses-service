import { Router } from "express";
import { categoriesRouter } from "./categories";
import { createCourseRouter } from "./create-course";
import { createLessonRouter } from "./create-lesson";
import { getCoursesRouter } from "./get-courses";
import { getLessonsRouter } from "./get-lessons";
import { getResourceRouter } from "./get-resource";
import { updateCourseRouter } from "./update-course";
import { updateLessonRouter } from "./update-lesson";

const router = Router();

router.use(getResourceRouter);
router.use(categoriesRouter);

router.use(createLessonRouter);
router.use(updateLessonRouter);
router.use(getLessonsRouter);

router.use(createCourseRouter);
router.use(getCoursesRouter);
router.use(updateCourseRouter);
router.use(updateCourseRouter);

export { router };
