import "@dumiorg/coursehouse-common/dist/helpers/auth";
import { prisma } from "../prisma-client";

// let hasRun = false;

// afterAll(async () => {
//   if (hasRun) {
//     await clearDatabase();
//   }
// });

// console.log({ hasRun });

async function clearDatabase() {
  console.log("CLEAR DATABASE");
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();
  await prisma.category.deleteMany();
}

export default clearDatabase;
