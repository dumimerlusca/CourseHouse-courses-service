import "@dumiorg/coursehouse-common/dist/helpers/auth";
import { prisma } from "../prisma-client";

beforeAll(async () => {});

afterAll(async () => {
  await prisma.course.deleteMany();
  await prisma.category.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.subCategory.deleteMany();
});
