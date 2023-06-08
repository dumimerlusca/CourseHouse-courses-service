import { Router } from "express";

const router = Router();

router.patch("/api/lessons/:lessonId", (req, res) => {
  res.send("Update lesson");
});

export { router as updateLessonRouter };
