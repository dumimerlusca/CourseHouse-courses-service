import { Router } from "express";

const router = Router();

router.post("/api/lessons", (req, res) => {
  res.send("Create lesson");
});

export { router as createLessonRouter };
