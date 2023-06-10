import {
  HttpException,
  authenticationRequired,
  checkValidation,
} from "@dumiorg/coursehouse-common";
import { Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { body } from "express-validator";
import { prisma } from "../prisma-client";
import { CategorySrv } from "../services/CategorySrv";

const router = Router();

export type ReqBody = {
  description: string;
  title: string;
  categoryId: string;
  price: number;
};

router.post(
  "/api/courses",
  authenticationRequired,
  body("description").notEmpty().isString(),
  body("title").notEmpty().isString(),
  body("categoryId").notEmpty().isString(),
  body("price").notEmpty().isNumeric(),
  checkValidation,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { categoryId, description, title, price } = req.body as ReqBody;
    const { id: userId } = req.currentUser!;

    const category = await CategorySrv.findSubcategory({ id: categoryId });

    if (!category) {
      throw new HttpException(400, "Category not valid");
    }

    const course = await prisma.course.create({
      data: {
        authorId: userId,
        description,
        title,
        price,
        categoryId,
      },
    });

    res.status(201).send(course);
  })
);

export { router as createCourseRouter };
