import { prisma } from "../prisma-client";

export class TestHelpers {
  static async createCourse({ userId }: { userId: string }) {
    return await prisma.course.create({
      data: {
        authorId: userId,
        description: "Description",
        price: 10,
        title: "Test",
        category: {
          create: {
            name: "web-development",
            category: {
              create: { name: "development" },
            },
          },
        },
      },
      include: { category: true },
    });
  }
}
