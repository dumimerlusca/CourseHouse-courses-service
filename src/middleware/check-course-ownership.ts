import { HttpException } from "@dumiorg/coursehouse-common";
import { Course } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { prisma } from "../prisma-client";

declare module "express" {
  export interface Request {
    course?: Course;
  }
}

export const checkCourseOwnership = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: userId } = req.currentUser!;
    const { courseId } = req.params;
    const course = await prisma.course.findFirst({ where: { id: courseId } });

    if (!course) {
      throw new HttpException(404, `Course with id ${courseId} not found`);
    }

    if (course.authorId !== userId) {
      throw new HttpException(401, "Unauthorized");
    }

    req.course = course;

    next();
  }
);
