import {
  HttpException,
  authenticationRequired,
} from "@dumiorg/coursehouse-common";
import { Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import path from "path";
import { prisma } from "../prisma-client";

const router = Router();

router.get(
  "/api/resources/lessons/:lessonId",
  authenticationRequired,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { lessonId } = req.params;

    const lesson = await prisma.lesson.findFirst({ where: { id: lessonId } });

    if (!lesson) {
      throw new HttpException(404, "Lesson not found");
    }

    res.sendFile(path.resolve(lesson.resourcePath));
  })
);

export { router as getResourceRouter };
