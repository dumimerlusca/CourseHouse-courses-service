import { authenticationRequired } from "@dumiorg/coursehouse-common";
import { Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { prisma } from "../prisma-client";

const router = Router();

router.get(
  "/api/courses",
  authenticationRequired,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.currentUser!;

    const courses = await prisma.course.findMany({
      where: { authorId: id },
      include: { category: true },
    });
    res.status(200).send(courses);
  })
);

export { router as getCoursesRouter };
