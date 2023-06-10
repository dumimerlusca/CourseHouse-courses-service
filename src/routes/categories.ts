import {
  HttpException,
  adminOnly,
  authenticationRequired,
  checkValidation,
} from "@dumiorg/coursehouse-common";
import { Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { body } from "express-validator";
import { prisma } from "../prisma-client";

const router = Router();

router.post(
  "/api/categories",
  authenticationRequired,
  adminOnly,
  body("name").notEmpty().isString(),
  checkValidation,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { name, subcategories } = req.body;

    const isCreatedAlready = await prisma.category.findFirst({
      where: { name },
    });

    if (isCreatedAlready) {
      throw new HttpException(400, "Category already exists");
    }

    const category = await prisma.category.create({
      data: {
        name,
        sub_categories: { createMany: { data: subcategories ?? [] } },
      },
      include: { sub_categories: true },
    });

    res.status(201).send(category);
  })
);

router.post(
  "/api/sub-categories",
  authenticationRequired,
  adminOnly,
  body("name").notEmpty().isString(),
  body("categoryId").notEmpty().isString(),
  checkValidation,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { name, categoryId } = req.body;

    const isCreatedAlready = await prisma.subCategory.findFirst({
      where: { name },
    });

    if (isCreatedAlready) {
      throw new HttpException(400, "Sub-Category already exists");
    }

    const subCategory = await prisma.subCategory.create({
      data: { name, categoryId },
    });

    res.status(201).send(subCategory);
  })
);

router.get(
  "/api/sub-categories",
  authenticationRequired,
  body("categoryId").notEmpty().isString(),
  checkValidation,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { categoryId } = req.body;

    const categories = await prisma.subCategory.findMany({
      where: { categoryId },
    });

    res.status(200).send(categories);
  })
);
router.get(
  "/api/categories",
  authenticationRequired,
  checkValidation,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const categories = await prisma.category.findMany();

    res.status(200).send(categories);
  })
);

export { router as categoriesRouter };
