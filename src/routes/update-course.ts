import { authenticationRequired } from "@dumiorg/coursehouse-common";
import { Prisma } from "@prisma/client";
import { Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { checkCourseOwnership } from "../middleware/check-course-ownership";
import { prisma } from "../prisma-client";

const router = Router();

router.patch(
  "/api/courses/:courseId",
  authenticationRequired,
  checkCourseOwnership,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { courseId } = req.params;

    const { description, title, categoryId, price } = req.body;

    const data = {} as Prisma.CourseUncheckedUpdateInput;

    if (description) data.description = description;
    if (title) data.title = title;
    if (categoryId) data.categoryId = categoryId;
    if (price) data.price = price;

    const updatedCourse = await prisma.course.update({
      where: { id: courseId },
      data: data,
      include: { category: true },
    });

    res.status(200).send(updatedCourse);
  })
);

export { router as updateCourseRouter };
