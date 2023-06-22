import {
  HttpException,
  authenticationRequired,
  checkValidation,
} from "@dumiorg/coursehouse-common";
import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { body } from "express-validator";
import multer from "multer";
import path from "path";
import { checkCourseOwnership } from "../middleware/check-course-ownership";
import { prisma } from "../prisma-client";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = Router();

router.post(
  "/api/courses/:courseId/lessons",
  authenticationRequired,
  upload.single("video"),
  checkCourseOwnership,
  body("title").isString().notEmpty(),
  body("description").isString().notEmpty(),
  checkValidation,
  expressAsyncHandler(async (req, res) => {
    const { title, description } = req.body;

    const { courseId } = req.params;

    if (!req.file) {
      throw new HttpException(400, "No file was uploaded");
    }

    const { path: filePath } = req.file;

    const lesson = await prisma.lesson.create({
      data: {
        resourcePath: filePath,
        description,
        title,
        courseId,
        index: 0,
        length: 0,
      },
    });

    res.status(201).send(lesson);
  })
);

export { router as createLessonRouter };
