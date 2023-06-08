import { Router } from "express";
import { prisma } from "../prisma-client";

const router = Router();

router.post("/api/courses", async (req, res) => {
  const data = await prisma.lesson.findMany({ include: { course: true } });
  res.send(data);
});

export { router as createCourseRouter };
