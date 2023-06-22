import {
  HttpException,
  authenticationRequired,
} from "@dumiorg/coursehouse-common";
import { Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { prisma } from "../prisma-client";

const router = Router();

// TODO Make sure the user is enrolled in this course
router.get(
  "/api/courses/:courseId/lessons",
  authenticationRequired,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { courseId } = req.params;

    const course = await prisma.course.findFirst({ where: { id: courseId } });

    if (!course) {
      throw new HttpException(404, "Course not found");
    }

    const lessons = await prisma.lesson.findMany({ where: { courseId } });

    res.status(200).send(lessons);
  })
);

export { router as getLessonsRouter };
